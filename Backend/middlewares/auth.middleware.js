const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/blackListToken.model");
const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization && req.headers?.authorization.split(" ")[1]);
console.log(token)
  if (!token) {
    return res.status(401).json({ message: "Invalid user" });
  }
  const isBlacklisted = await blackListTokenModel .findOne({token:token})
  if(isBlacklisted){
    return res.status(401).json({ message: "Unauthorised" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id);
    

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid user" });
  }
};

module.exports.authCaptain = async (req , res, next ) => {
  const token = req.cookies.token || (req.headers.authorization && req.headers?.authorization.split(" ")[1]);
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: "Invalid user" });
  }
  const isBlacklisted = await blackListTokenModel .findOne({token:token})
  if(isBlacklisted){
    return res.status(401).json({ message: "Unauthorised" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const captain = await captainModel.findById(decoded._id);
    

    req.captain = captain;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid user" });
  }
}

