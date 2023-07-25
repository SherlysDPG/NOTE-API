import jwt from 'jsonwebtoken';
import { ValidationError } from '../services/handleErrors.js';
import { verifyToken } from '../services/jwt.js';
import { HandleHttp } from '../services/handleErrors.js';

const { TokenExpiredError, JsonWebTokenError } = jwt;

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.cookies.token)
      throw new ValidationError('Es necesario un token para acceder');

    const token = req.cookies.token;

    const payload = await verifyToken(token);

    req.userID = payload.id;

    next();
  } catch (e) {
    let error = { status: 500, msg: ['AUTH_ERROR'] };

    if (
      e instanceof ValidationError ||
      e instanceof TokenExpiredError ||
      e instanceof JsonWebTokenError
    ) {
      error = { status: 400, msg: [e.message] };
    }

    HandleHttp(res, error);
  }
};

export { authMiddleware };
