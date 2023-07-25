import { Router } from 'express';
import {
  signInCtrl,
  signUpCtrl,
  verifyUserCtrl,
} from '../controllers/authCtrl.js';

import { signIn, signUp } from '../validations/userSchema.js';
import { validated } from '../middlewares/validator.js';

const router = Router();

router.post('/signup', validated(signUp), signUpCtrl);
router.post('/signin', validated(signIn), signInCtrl);
router.get('/verify/:id', verifyUserCtrl);

export { router };
