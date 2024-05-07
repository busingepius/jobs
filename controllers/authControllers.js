const User = require("../models/User");
const {BadRequestError} = require("../errors");

async function register(req,res,next){
    const {email,password} = req.body;
    const user = await User.create({...req.body});
    const token  = user.createJWT();
    res.status(201).json({data:token});
}

async function login(req, res, next) {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw new BadRequestError(`user with email ${email} not found`);
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        throw new BadRequestError(`Wrong password provided try again later`);
    }

    const token = user.createJWT();
    res.status(201).json({data: token});
}

module.exports = {login,register};