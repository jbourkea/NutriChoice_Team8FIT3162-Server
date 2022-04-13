import jwt from 'jsonwebtoken'
 
// Similar to 'auth.js' , although no errors thrown when no token is provided
const optionalAuth = async (req, res, next) => {
    // Retrieve the token from header
    const token = req.headers['x-access-token'];

    // Checks if the token has been attached
    if(!token){
        next();
    }

    // Checks that the token sent is valid
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if(err){
            throw new UnauthorizedError('Invalid Token');
        } else{
            // Attach user id to the request and pass on to handlers
            req.userid = payload.id;
            next();
        }
    });

}

export default auth