// Base Server Imports
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
import 'express-async-errors'
dotenv.config();
//Middleware
import NotFoundMiddleware from './middleware/NotFound.js';
import ErrorHandlerMiddleware from './middleware/ErrorHandler.js'

// Server initialization
const app = express();
const port = process.env.PORT || 8008;
app.use(express.json());

// Routes
// TODO: Implement Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
})

// Middleware
app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

const startServer = async () => {
    try {
        await connectDB(process.env.DB_URL);
        app.listen(port, () => {
            console.log(`App is listening on port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();