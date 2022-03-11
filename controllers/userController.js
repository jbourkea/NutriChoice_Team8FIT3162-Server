import User from '../models/User.js'
import { BadRequestError } from '../errors/index.js'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

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


export {register, loginUser}