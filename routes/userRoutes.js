import express from 'express'
import {register, loginUser} from '../controllers/userController.js'

// Define the router
const userRouter = express.Router();

// Create routes and attach methods and controller actions
userRouter.route('/register').post(register);
userRouter.route('/login').post(loginUser);

export default userRouter