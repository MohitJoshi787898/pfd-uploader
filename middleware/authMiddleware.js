// This middleware will protect routes by verifying the JWT token.

const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/jwtConfig');
exports.verifyToken=(req,res)=>{
    const token=req.headers['authorization'];
    if(!token){
        return res.status(401).json({message:"Token is required"});
    }
    try {
        const decoded=jwt.verify(token,secretKey);
        req.user=decoded;
        nexxt();
    } catch (error) {
        res.status(401).josn({message:"Invalid token"})
    }
}