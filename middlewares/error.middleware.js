const errorMiddleware = (err, req, res, next) => {
  try {
    //access previous error and create a new variable to store all
    let error = { ...err };

    // add new error
    error.message = err.message;
    console.log(error);

    //mongoose bad ObjectId
    if (error.name === "CastError") {
      const message = "Resource not found";
      error = new Error(message);
      error.statusCode = 404;
    }

    // mongoose duplicate key error
    if (error.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message);
      error.statusCode = 400;
    }

    //mongoose validation error
    if (error.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    // return error response
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Server error", success: false });
  } catch (error) {
    //pass the error to next handler
    next(error);
  }
};

export default errorMiddleware;
