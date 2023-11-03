// Good practice is to separate all the api routes and all the callback functions
// This is called MVC architecture: Model, View, Controller
// keep all the api routes inside "routes" folder
// keep all the callback functions for routes inside "controllers" folder
// keep the mongoose models inside "models" folder
// we will listen to server, connect to mongoDB databse inside "server.js"
// so our main file will be "server.js"
// keep all secret variables like port number, databse connection url, secret 
// key, passwords, etc inside "config.env" file inside "data" folder
// create a ".gitignore" file and enter path of all the files that you don't want to upload to github

import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";

export const app = express();

dotenv.config({
  path: "./data/config.env",
});

//using middlewares
app.use(express.json())   //this will allow to send json data from client side. It recognizes incoming requests with a JSON format and parses the data into a JavaScript object, making it accessible in your Express application.
app.use(cookieParser())


//this will add prefix to the endpoints of apis defined in the routes
app.use("/api/v1/users", userRouter); // it means in all the user routes this prefix is added



app.get("/", (req, res) => {
  res.send("Hello there...✌");
});
