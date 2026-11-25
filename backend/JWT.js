const {sign, verify} = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const createToken = (user) => {
    const accessToken = sign({username: user.username, id: user.id}, process.env.JWT_SECRET);

    return accessToken
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) return res.status(401).json({validated: false});
    console.log("Trying to validate access token " + accessToken);

    try {
        const validToken = verify(accessToken, process.env.JWT_SECRET);
        if (validToken) {
            req.authenticated = true;
            req.userID = validToken.id;
            return next();
        }
    } catch (err) {return res.status(401).json({error: err, validated: false})};
}

module.exports = { createToken, validateToken }