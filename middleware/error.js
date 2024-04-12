//To identify a callback as a errorHandler, the first argument must be error
// An error handler function is executed whenever next() of a callback function (here controller) is called by
// passing an error 


class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
export const errorMiddleware = (err, req, res, next) => {
    const errStatusCode = err.status || 500;
    const errMessage = err.message || "Internal Server Error!";

    return res.status(errStatusCode).json({
        success: false,
        message: errMessage,
    });
}

export { ErrorHandler };