import { HandleHttp, ValidationError } from '../services/handleErrors.js';
import noteModel from '../models/noteModel.js';

const findAllNote = async (req, res) => {
  try {
    const userId = req.userID;
    const notes = await noteModel.find({ author: userId, deleted: false });

    res.json({ notes });
  } catch (e) {
    let error = { status: 500, msg: ['ERROR_FIND_ALL_NOTES'] };

    HandleHttp(res, error);
  }
};

const findNote = async (req, res) => {
  try {
    const userId = req.userID;
    const { id } = req.params;

    const note = await noteModel.findOne({
      _id: id,
      author: userId,
      deleted: false,
    });

    if (!note)
      throw new ValidationError('La nota no existe o a sido eliminado');

    res.json({ note });
  } catch (e) {
    let error = { status: 500, msg: ['ERROR_FIND_NOTE'] };

    if (e instanceof ValidationError) {
      error = { status: 400, msg: [e.message] };
    }

    HandleHttp(res, error);
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userID;

    const note = new noteModel({
      author: userId,
      title,
      content,
    });

    await note.save();

    res.json({ msg: 'La nota se ha creado correctamente' });
  } catch (e) {
    let error = { status: 500, msg: ['ERROR_CREATE_NOTE'] };

    HandleHttp(res, error);
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    const note = await noteModel.findById(id);
    if (!note || note.deleted)
      throw new ValidationError('La nota no existe o a sido eliminado');

    await noteModel.findByIdAndUpdate(id, {
      title,
      content,
    });

    res.json({ msg: 'La nota se a actualizado correctamente' });
  } catch (e) {
    let error = { status: 500, msg: ['ERROR_UPDATE_USER'] };

    if (e instanceof ValidationError) {
      error = { status: 400, msg: [e.message] };
    }

    HandleHttp(res, error);
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    await noteModel.findByIdAndUpdate(id, { deleted: true });

    res.json({ msg: 'La nota se a eliminado correctamente' });
  } catch (e) {
    const error = { status: 500, msg: ['ERROR_DELETE_NOTE'] };

    HandleHttp(res, error);
  }
};

export { findAllNote, findNote, createNote, updateNote, deleteNote };
