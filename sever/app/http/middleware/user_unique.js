const winston = require("winston");

const {User_model}=require("../../models/database/index")
module.exports = async(req, res, next) => {
    console.log("mmm")
    const user=await User_model.find_user(req.body)
    if (user){
        res.status(401).json({ message: "user exist" });
    }
    next
};