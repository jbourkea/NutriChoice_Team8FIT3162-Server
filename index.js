// Base Server Imports
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
import 'express-async-errors'
dotenv.config();
//Middleware
import NotFoundMiddleware from './middleware/NotFound.js';
import ErrorHandlerMiddleware from './middleware/ErrorHandler.js'
// Routers
import productRouter from './routes/productRoutes.js';

// Server initialization
const app = express();
const port = process.env.PORT || 8008;
app.use(express.json());

// Routers
app.use('/api/v1/products', productRouter);

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