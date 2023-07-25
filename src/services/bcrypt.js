import { genSalt, hash, compare } from 'bcrypt';

const encrypt = async (password) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

const verify = async (password, resPassword) => {
  return await compare(password, resPassword);
};

export { encrypt, verify };
