import { Router } from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/userCtrl.js';

import { authMiddleware } from '../middlewares/auth.js';
import { validated } from '../middlewares/validator.js';
import { signUp } from '../validations/userSchema.js';

const router = Router();

router.get('/', authMiddleware, getUser);
router.put('/', authMiddleware, validated(signUp), updateUser);
router.delete('/', authMiddleware, deleteUser);
export { router };
