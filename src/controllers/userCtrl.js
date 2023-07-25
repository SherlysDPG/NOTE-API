import usersModel from '../models/userModel.js';
import { encrypt } from '../services/bcrypt.js';
import { HandleHttp, ValidationError } from '../services/handleErrors.js';

const getUser = async (req, res) => {
  try {
    const userId = req.userID;

    const user = await usersModel.findById(userId);

    if (user.deleted) {
      res.clearCookie('token');
      throw new ValidationError('El usuario a sido eliminado');
    }

    res.json({ username: user.username, email: user.email });
  } catch (e) {
    let error = { status: 500, msg: ['ERROR_GET_USER'] };

    if (e instanceof ValidationError) {
      error = { status: 400, msg: [e.message] };
    }

    HandleHttp(res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userId = req.userID;

    const user = await usersModel.findById(userId);
    if (user.deleted) {
      res.clearCookie('token');
      throw new ValidationError('El usuario a sido eliminado');
    }

    await usersModel.findByIdAndUpdate(userId, {
      username,
      email,
      password: await encrypt(password),
    });

    res.json({ msg: 'El usuario se a actualizado correctamente' });
  } catch (e) {
    let error = { status: 500, msg: ['ERROR_UPDATE_USER'] };

    if (e instanceof ValidationError) {
      error = { status: 400, msg: [e.message] };
    }

    HandleHttp(res, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.userID;

    await usersModel.findByIdAndUpdate(userId, { deleted: true });

    res.clearCookie('token');
    res.json({ msg: 'El usuario se a eliminado correctamente' });
  } catch (e) {
    const error = { status: 500, msg: ['ERROR_DELETE_USER'] };

    HandleHttp(res, error);
  }
};

export { getUser, updateUser, deleteUser };
