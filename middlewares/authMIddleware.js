const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(404).json({ msg: "access denied..." })
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded
            console.log(req.user, "....")
            next()
        } catch (error) {
            return res.status(404).json({ msg: "access denied..." })
        }

    } else {
        return res.status(404).json({ msg: "token not found..." })
    }
}

module.exports = verifyToken