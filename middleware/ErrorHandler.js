// Middleware for handling errors occuring in the server
const ErrorHandlerMiddleware = (err, req, res, next) => {
    //TODO: Implement propper error handing proceedure (logged to console for debugging)
    console.log(err)
    let statuscode = err.statusCode || 500;
    let message = err.message || "Unexpected Error Ocurred";
    res.status(statuscode).json(message);
}

export default ErrorHandlerMiddleware;