const statusCode = require('./statusCode');

class BaseError extends Error {
  constructor(message = 'Internal server error.') {
    super(message);
    this.name = 'ServerError';
    this.statusCode = statusCode.SERVER_ERROR;
    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
