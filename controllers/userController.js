import User from '../models/User.js'
import { BadRequestError } from '../errors/index.js'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

/*
register
API Controller for registering a user
Input in body:
    {email, password, displayName}
Returns email and display name of newly created user - {email, displayName}
*/
const register = async (req, res) => {
    const {email, password, displayName} = req.body;
    let minPassLength = 8;

    // Check if any fields missing
    if (!email || !password || !displayName){
        throw new BadRequestError("Please provide all fields")
    }

    // Check if password is long enough
    if(password.length < 8){
        throw new BadRequestError('Password is too short')
    }

    // Check if email is in use by another user
    const existingEmail = await User.findOne({email});
    if(existingEmail){
        throw new BadRequestError('This email is already in use')
    }

    // Check if display name is in use by another user
    const existingName = await User.findOne({displayName});
    if(existingName){
        throw new BadRequestError("This display name is taken")
    }

    // Salt and Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create the new user
    const newUser = new User({
        _id : new mongoose.Types.ObjectId(),
        email,
        password:hashedPassword,
        displayName
    });
    const savedUser = await newUser.save();

    return res.status(201).json({email, displayName});
}

/*
loginUser
API Controller for logging in user and returning token
Input in body:
    {email, password}
Returns:
{
    token : jwt for the user logging in,
    user : {
        email : users' email address,
        displayName : users' display name
    }
}
*/
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    // Check if both fields exist
    if (!email || !password){
        throw new BadRequestError('Please provide all fields');
    }

    //Find user with provided email + check if account exists
    const userAccount = await User.findOne({email}).select('+password');
    if(!userAccount){
        throw new BadRequestError('No account is associated with this email');
    }

    // Check if the hashed password matches provided password
    const correctPassword = await bcrypt.compare(password, userAccount.password);
    if(!correctPassword){
        throw new BadRequestError('Invalid Login Credentials');
    }

    // Login successful, create JWT
    const token = jwt.sign({id:userAccount._id}, process.env.JWT_SECRET);
    res.status(200).json({
        token,
        user : {
            email:userAccount.email,
            displayName:userAccount.displayName
        }
    });
    

}

const updateUser = async (req, res) => {
    const {displayName, password, accountRole} = req.body;

    const targetUser = await User.findOne({_id:req.userid});
    if(!targetUser){
        throw new BadRequestError("No user was found")
    }

    if(displayName){
        // Check if display name is in use by another user
        const existingName = await User.findOne({displayName});
        if(existingName){
            throw new BadRequestError("This display name is taken")
        }
        // Update user's display name and return success message
        targetUser.displayName = displayName;
        await targetUser.save();
        return res.status(200).json({msg: 'Display name was changed to ' + displayName});

    } else if(password){
        // Salt and Hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update user's password and return success message
        targetUser.password = hashedPassword;
        await targetUser.save();
        return res.status(200).json({msg: "Password has been successfully changed"});

    } else if(accountRole){
        // Immediately set account to specified role
        // TODO: Add verification on who can set these roles
        targetUser.accountRole = accountRole;
        await targetUser.save();
        return res.status(200).json({msg: "Role has been successfully changed to " + "accountRole"});
    }
    throw new BadRequestError("Request parameters were invalid")
}

const getUserProducts = async (req, res) => {
    const targetUser = await User.findOne({_id:req.userid});
    if(!targetUser){
        throw new BadRequestError('No User Found');
    }

    await targetUser.populate('subProducts');
    return res.status(200).json(targetUser.subProducts);
}

export {register, loginUser, updateUser, getUserProducts}