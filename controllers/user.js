// define and export all the callback functions for user routes inside here

import User from "../models/user.js";
import bcrypt from "bcrypt";

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

    res.status(200).send(user);

  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

//Get All Users
const logoutUser = async (req, res) => {
  res.send("This will logout users");
};

export { getAllUsers, loginUser, logoutUser, registerUser };
