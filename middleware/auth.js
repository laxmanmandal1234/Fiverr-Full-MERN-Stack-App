import jwt from "jsonwebtoken";
import { ErrorHandler } from "./error.js";

export const isAuthenticated = async (req, res, next) => {

}

export const verifyToken = async (req, res, next) => {
    const { accessToken } = req.cookies;            //get access token from the cookies
    console.log("Access Token: ", accessToken);

    if(!accessToken){               //check if any user is logged in or not 
      console.log("No access token found");
      return next(new ErrorHandler(401, "You are not Logged in. Login first."));
    }
  
    //check if user logged in is same as user id who want to delete
    jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, payload) => {
        if(err) {
          console.log("Token verification failed:", err);
          return next(new ErrorHandler(403, "Token is not valid"));
        }
        //payload has id and isSeller info of the user who is logged in
        // Log decoded payload and assigned properties
        console.log("Decoded payload:", payload);
        req.userId = payload.id;
        req.isSeller = payload.isSeller;
        console.log("userId:", req.userId);
        console.log("isSeller:", req.isSeller);

        next();
    });
}
