import { HandleHttp, ValidationError } from '../services/handleErrors.js';
import { encrypt, verify } from '../services/bcrypt.js';
import { tokenSign } from '../services/jwt.js';
import usersModel from '../models/userModel.js';

const signUpCtrl = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new usersModel({
      username,
      email,
      password: await encrypt(password),
    });

    await user.save();

    res.cookie('token', tokenSign(user), {
      maxAge: 86400000,
      httpOnly: true,
      sameSite: 'lax',
    });

    res.json({ msg: 'El usuario se a registrado correctamente' });
  } catch (e) {
    let error = { status: 500, msg: ['ERROR_SIGN_UP'] };

    if (e.code === 11000) {
      error = { status: 400, msg: ['Ese usuario ya esta registrado'] };
    }

    HandleHttp(res, error);
  }
};

const signInCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usersModel.findOne({ email }).select('password deleted');

    if (!user) throw new ValidationError('Usuario o contraseña incorrecto');

    if (user.deleted) throw new ValidationError('El usuario a sido eliminado');

    const check = await verify(password, user.password);
    if (!check) throw new ValidationError('Usuario o contraseña incorrecto');

    res.cookie('token', tokenSign(user), {
      maxAge: 86400000,
      httpOnly: true,
      sameSite: 'lax',
    });

    res.json({ msg: 'El usuario a iniciado sección correctamente' });
  } catch (e) {
    let error = { status: 500, msg: ['ERROR_SIGN_IN'] };

    if (e instanceof ValidationError) {
      error = { status: 400, msg: [e.message] };
    }

    HandleHttp(res, error);
  }
};

const verifyUserCtrl = async (req, res) => {
  try {
    const { id } = req.params;

    await usersModel.findByIdAndUpdate(id, { verified: true });

    res.json({ msg: 'Usuario verificado' });
  } catch (e) {
    const error = { status: 500, msg: ['ERROR_VERIFY_USER'] };

    HandleHttp(res, error);
  }
};

export { signInCtrl, signUpCtrl, verifyUserCtrl };
