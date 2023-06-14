import { error } from 'joi/lib/types/alternatives';
import { GeneralError } from '../error';

// eslint-disable-next-line no-unused-vars
const handleErrors = (err, req, res, next) => {
  console.log('error check', err);
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message,
    });
  }
  // Handling error thrown by jwt
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: err.message,
  });
};

export default handleErrors;
