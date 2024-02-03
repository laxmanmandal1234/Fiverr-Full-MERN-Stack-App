import jwt from "jsonwebtoken";

export const sendCookie = async (user, res, statusCode, message) => {
    const token = jwt.sign({ id: user._id, isSeller: user.isSeller }, process.env.JWT_SECRET_KEY);
    
    //{ httpOnly: true } option ensures that the cookie is only accessible through HTTP and not through client-side JavaScript, which is a security measure.
    res.status(statusCode).cookie("accessToken", token, {
        httpOnly: true, maxAge: 5*60*1000
    })
    .json({
        success: true,
        message: message,
    });

}