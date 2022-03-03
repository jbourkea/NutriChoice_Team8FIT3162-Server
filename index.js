// Base Server Imports
import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

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
// TODO: Implement Middleware

try {
    app.listen(port, () => {
        console.log(`App is listening on port ${port}...`);
    })
} catch (error) {
    console.log(error);
}