import { Router } from 'express';
import {
  findAllNote,
  findNote,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/noteCtrl.js';

import { authMiddleware } from '../middlewares/auth.js';
import { validated } from '../middlewares/validator.js';
import { note, noteParm } from '../validations/noteSchema.js';

const router = Router();

router.get('/all', authMiddleware, findAllNote);
router.get('/:id', authMiddleware, validated(noteParm), findNote);
router.post('/', authMiddleware, validated(note), createNote);
router.put(
  '/:id',
  authMiddleware,
  validated(noteParm),
  validated(note),
  updateNote
);
router.delete('/:id', authMiddleware, validated(noteParm), deleteNote);

export { router };
