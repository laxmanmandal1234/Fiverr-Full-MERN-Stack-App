// In the routes folder, we keep all the api routes like routes for creating
// new user, route for getting all users, routs to create posts, etc.
// We will have different files inside routes folder for routes related to different features like
// routes related to users, routes related to products, routes relatd to post, messages, etc
// Then, export each router defined inside all files inside routes folder and
// import all inside app.js to connect these routers with the app

import express from "express";
import {
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.js";

//create an express router
const router = express.Router();

//define all api routes related to user
router.get("/all", getAllUsers);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/register", registerUser);

export default router;
// we will import this router in app.js as userRouter