import jwt from "jsonwebtoken";

export const sendCookie = async (user, res, statusCode, message) => {
    //here all the user info is inside _doc property of user object
    const token = jwt.sign({ id: user._doc._id, isSeller: user._doc.isSeller }, process.env.JWT_SECRET_KEY);
    
    //{ httpOnly: true } option ensures that the cookie is only accessible through HTTP and not through client-side JavaScript, which is a security measure.
    res.status(statusCode).cookie("accessToken", token, {
        httpOnly: true, maxAge: 5*60*1000
    })
    .json({
        success: true,
        message: message,
        user
    });

    console.log("Cookie sent:", token); // Log the cookie value
}