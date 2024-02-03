import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {

}

export const verifyToken = async (req, res, next) => {
    const {accessToken} = req.cookies;            //get access token from the cookies
    if(!accessToken){               //check if any user is logged in or not 
      return res.status(401).json({
        success: false,
        message: "You are not Logged in. Login first."
      });
    }
  
    //check if user logged in is same as user id who want to delete
    jwt.verify(accessToken, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if(err) {
            return res.status(403).send("Token is not valid");
        }
        //payload has id and isSeller info of the user who is logged in
        req.userId = payload.id,
        req.isSeller = payload.isSeller
        next();
    });

}
