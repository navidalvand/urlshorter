class ErrorHandler {
  sendError(err, req, res, next) {
    const statusCode = err.statusCode || err.status || err.code;
    const message = err.message || "Internal Server Error";
    const data = err.data || null;

    res.status(statusCode).json({
      message,
      data,
      statusCode,
    });
  }

  createError({ message, statusCode, data }) {
    return { message, statusCode, data };
  }
}

module.exports = {
  ErrorHandler: new ErrorHandler(),
};
