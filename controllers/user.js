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
      return next(new ErrorHandler(400, "User already registered"));
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

//Get a single user
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user) {
      return next(new ErrorHandler(404, "User not found"));
  }

    res.status(200).send(user);
    
  } catch (error) {
    next(error);
  }
};


//Login user
const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({username}).select("+password");   //initially when creating user model, password field is set to select:false, so it wont be accessed by default with User.find()   
    if(!user){
      return next(new ErrorHandler(404, "Invalid username or password"));
    }
         
    //compare password
    const isMatched = await bcrypt.compare(req.body.password, user.password);
    if(!isMatched){
      return next(new ErrorHandler(404, "Invalid username or password"));
    }
    
    const { password: passwordFromUser, ...userWithoutPassword} = user;
    sendCookie(userWithoutPassword, res, 200, `Welcome aboard, ${user.username}`);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

//Logout user
const logoutUser = async (req, res) => {
  res.clearCookie("accessToken", {sameSite: "none", secure: true})
  .status(200)
  .send("You are logged out.");
};

//Delete a user
const deleteUser = async (req, res, next) => {
  const userToDelete = await User.findById(req.params.id);  //find user you want to delete with requested ID
  if(!userToDelete){
    return next(new ErrorHandler(404, `User does not exist with give id: ${req.params.id}`));
}
  //check if user logged in is same as the user id you want to delete
  if(req.userId !== userToDelete._id.toString()) {
    return next(new ErrorHandler(403, "You are not authorised to delete someone else account"));
  }
    
  await User.findByIdAndDelete(req.params.id);

  res.clearCookie('accessToken', {sameSite: "none", secure: true}).status(200).json({
    success: true,
    message: `👋👋 Bye Bye ${userToDelete.username}. Your Account is deleted successfully. Token cleared.`,
  });
};

export { getAllUsers, getUser, loginUser, logoutUser, registerUser, deleteUser };
