import User from '../models/User.js'
import { BadRequestError } from '../errors'
import bcrypt from 'bcryptjs'

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
    if(existingUser){
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
        email,
        password:hashedPassword,
        displayName
    });
    const savedUser = await newUser.save();

    return res.status(201).json({email, displayName});


}