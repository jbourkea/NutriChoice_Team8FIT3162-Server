// Middleware for handling errors occuring in the server
const ErrorHandlerMiddleware = (err, req, res, next) => {
    //TODO: Implement propper error handing proceedure (logged to console for debugging)
    console.log(err)
}

export default ErrorHandlerMiddleware;