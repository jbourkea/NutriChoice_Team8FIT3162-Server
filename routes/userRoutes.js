import express from 'express'
import {register} from '../controllers/userController.js'

// Define the router
const userRouter = express.Router();

// Create routes and attach methods and controller actions
userRouter.route('/').post(register);

export default userRouter