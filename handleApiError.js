const BaseError = require('./baseError');
const statusCode = require('./statusCode');

const Errors = Object.freeze({
  InputValidation: {
    name: 'InputValidation',
    message: 'Verify data again.',
    statusCode: statusCode.BAD_REQUEST,
  },
  ResourceNotFound: {
    name: 'ResourceNotFound',
    message: 'Resources not found.',
    statusCode: statusCode.NOT_FOUND,
  },
  MethodNotAllowed: {
    name: 'MethodNotAllowed',
    message: 'Method not allowed.',
    statusCode: statusCode.NOT_ALLOWED,
  },
  ServerError: {
    name: 'ServerError',
    message: 'Internal server error.',
    statusCode: statusCode.SERVER_ERROR,
  },
});

class ApiError extends BaseError {
  constructor(error) {
    super(error);
    if (Errors[error.key] && Errors[error.key].name) {
      this.name = Errors[error.key].name;
      this.message = error.message || Errors[error.key].message;
      this.statusCode = error.statusCode || Errors[error.key].statusCode;
    }
    Error.captureStackTrace(this);
  }

  static send(response, error) {
    const errorResponse = {
      name: error.name,
      statusCode: error.statusCode || statusCode.SERVER_ERROR,
      message: error.message,
    };
    response
      .status(error.statusCode || statusCode.SERVER_ERROR)
      .send(errorResponse);
  }
}

module.exports = ApiError;
