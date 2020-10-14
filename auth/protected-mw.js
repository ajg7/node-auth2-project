const jwt = require("jsonwebtoken");
const secret = require("./secret");

module.exports = (request, response, next) => {
    const token = request.headers.authorization;

    if (token) {
        jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
            if(error) {
                response.status(401).json({ message: "Invalid Token" })
            } else {
                response.jwt = decodedToken;
                next();
            }
        })
    } else {
        response.status(401).json({ message: "Please Log In" })
    }
}