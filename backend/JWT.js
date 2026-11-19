const {sign, verify} = require('jsonwebtoken');
require('dotenv').config();

const createToken = (user) => {
    const accessToken = sign({username: user.username, id: user.id}, process.env.JWT_SECRET);

    return accessToken
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) return res.status(400).json({validated: false});

    try {
        const validToken = verify(accessToken, process.env.JWT_SECRET);
        if (validToken) {
            req.authenticated = true;
            req.userID = validToken.id;
            return next();
        }
    } catch (err) {return res.status(400).json({error: err, validated: false})};
}

module.exports = { createToken, validateToken }