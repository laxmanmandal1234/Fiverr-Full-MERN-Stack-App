// define and export all the callback functions for user routes inside here

import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Register new user
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let newUser = await User.findOne({ email });

    if (newUser) {
        res.status(400).send("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
  
    res.status(201).send("User created successfully. ✅");
  } catch (error) {
    console.log(error)
    res.send(500).send("Something went wrong!😒")
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
      res.status(404).send("Invalid Email or password");
    }
         
    //compare password
    const isMatched = await bcrypt.compare(req.body.password, user.password);
    if(!isMatched){
      res.status(404).send("Invalid Email or password");
    }

    const token = jwt.sign({ id: user._id, isSeller: user.isSeller }, process.env.JWT_SECRET_KEY);

    res.status(200).cookie("accessToken", token, {
      httpOnly: true,
    })
    .json({
      success: true,
      message: `Welcome aboard, ${user.username}`
    });

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
const deleteUser = async (req, res) => {
  const {accessToken} = req.cookies;
  if(!accessToken){
    return res.status(401).json({
      success: false,
      message: "Login first"
    });
  }

  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, payload) => {
    res.send(payload);
  });



};

export { getAllUsers, loginUser, logoutUser, registerUser, deleteUser };
