import jwt from 'jsonwebtoken';

const { sign, verify } = jwt;

const JWT_SECRET = process.env.JWT_SECRET;

const tokenSign = (user) => {
  const TokenSign = sign({ id: user.id }, JWT_SECRET, {
    expiresIn: '1d',
  });

  return TokenSign;
};

const verifyToken = async (tokenSign) => {
  return verify(tokenSign, JWT_SECRET);
};

export { tokenSign, verifyToken };
