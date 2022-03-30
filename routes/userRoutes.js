import express from 'express'
import {register, loginUser, updateUser} from '../controllers/userController.js'
import auth from '../middleware/auth.js'

// Define the router
const userRouter = express.Router();

// Create routes and attach methods and controller actions
userRouter.route('/register').post(register);
userRouter.route('/login').post(loginUser);
userRouter.route('/update').patch(auth, updateUser)

export default userRouter