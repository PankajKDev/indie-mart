class ApiError extends Error {
  constructor(
    statusCode,
    message = "App encountered an error",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null; //to pass extra info
    this.message = message;
    this.success = false; //suuccess is always fall
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export { ApiError };
