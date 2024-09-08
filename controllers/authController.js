const jwt=require("jsonwebtoken");
const User=require("../models/userModel");
const {secretKey,options} =require("../config/jwtConfig");
const { response } = require("express");

exports.register=async (req,res)=>{
    const {username,password}=req.body;
    console.log(req.body,"hhhhhhhhhhhh");
    try {
        const user=new User({username:username,password:password});
        await user.save();
        res.status(200).json({message:"User Resgister successfully"});
    } catch (error) {
        res.status(500).json({message:"Registration Error",error});
    }
};
exports.login=async (req,res)=>{
    const {username,password}=req.body;
    try {
        const user=await User.findOne({username})
        if(!user){
            return res.status(401).json({message: "Invalid username"});

        }
        const IsPasswordValid = await user.comparePassword(password);
        if(!IsPasswordValid){
            res.status(401).json({message: "Invalid password"});
        }
        const token=jwt.sign({id:user.id,password:user.password},secretKey,options)
        res.status(200).json({token:token});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
exports.protectedRoute=(req, res) => {
    res.json({message:"protected route",user:req.user});
}