class ExpressError extends Error {
  constructor(statusCode, message) {
    super(message);      // ✅ attach message to Error
    this.statusCode = statusCode;
  }
}

module.exports = ExpressError;