const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET_KEY

const verifyAdminToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: "Access Denied. No token provided"});

    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log("verifyAdminToken error:", err)
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({
                    message: "Token expired"
                });
            }
            return res.status(403).json({message: "Invalid credentials"})
        }
        req.user = user;
        next();
    })

}

module.exports = verifyAdminToken