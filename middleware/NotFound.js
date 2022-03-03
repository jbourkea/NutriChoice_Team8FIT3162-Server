
// Middleware for when no routes are found for incoming URL
const NotFoundMiddleware = (req, res) => {
    return res.status(404).send("Error 404: Route was not found")
}

export default NotFoundMiddleware;