import { Router } from 'express';
import { userSignUp, userLogin } from '../controllers/authControlle';
import { signUpValidation, loginValidation } from '../middleware/helper';

const router = Router();

router.post('/signUp', signUpValidation, userSignUp);
router.post('/Login', loginValidation, userLogin);





export default router;