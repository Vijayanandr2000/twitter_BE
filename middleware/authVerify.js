const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const secretKey = authConfig.secretKey;

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if(!token){
        return res.status(403).send({
            message: 'No token provided...!'
        })
    }
    jwt.verify(token, secretKey, (err,decoded) => {
        if(err){
            return res.status(401).send({
                message: 'Unauthorized',
                err:err.message
            });
        }

        req.id = decoded.id;
        next();
    })
    
}

module.exports = {
    verifyToken
}