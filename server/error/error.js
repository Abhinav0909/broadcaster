class ErrorHandler {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
  static validationError(message = "All fields are required!") {
    return new ErrorHandler(422, message);
  }
  static serverError(message = "Internal Server Error") {
    return new ErrorHandler(500, message);
  }
  static linkError(message = "Link has been expired") {
    return new ErrorHandler(404, message);
  }
  static sentError(message = "Email has been already sent"){
    return new ErrorHandler(400,message);
  }
  static uncaughtError(message = "Something went wrong") {
    return new ErrorHandler(500, message);
  }
}
module.exports = ErrorHandler;
