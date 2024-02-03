// define and export all the callback functions for user routes inside here

import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import { ErrorHandler } from "../middleware/error.js";

//Register new user
const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let newUser = await User.findOne({ email });

    if (newUser) {
      return next(new ErrorHandler("User already registered", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);   //10 is salting level

    newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
  
    sendCookie(newUser, res, 201, "User created successfully");

  } catch (err) {
    next(err);
  }
};

//Get All Users
const getAllUsers = async (req, res) => {
  res.send("This will get all users");
};

//Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email}).select("+password");   //initially when creating user model, password field is set to select:false, so it wont be accessed by default with User.find()   
    if(!user){
      return next(new ErrorHandler("Invalid Email or password", 404));
    }
         
    //compare password
    const isMatched = await bcrypt.compare(req.body.password, user.password);
    if(!isMatched){
      return next(new ErrorHandler("Invalid Email or password", 404));
    }

    sendCookie(user, res, 200, `Welcome aboard, ${user.username}`);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

//Logout user
const logoutUser = async (req, res) => {
  res.send("This will logout users");
};

//Delete a user
const deleteUser = async (req, res, next) => {
  const userToDelete = await User.findById(req.params.id);  //find user you want to delete with requested ID
  if(!userToDelete){
    return next(new ErrorHandler(`User does not exist with give id: ${req.params.id}`, 404));
}
  //check if user logged in is same as the user id you want to delete
  if(req.userId !== userToDelete._id.toString()) {
    return next(new ErrorHandler("You are not authorised to delete someone else account", 403));
  }
    
  await User.findByIdAndDelete(req.params.id);

  res.clearCookie('accessToken').status(200).json({
    success: true,
    message: `👋👋 Bye Bye ${userToDelete.username}. Your Account is deleted successfully. Token cleared.`,
  });
};

export { getAllUsers, loginUser, logoutUser, registerUser, deleteUser };
