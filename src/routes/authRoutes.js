const { Router } = require('express');
const { userSignUp, userLogin } = require('../controllers/authControlle');
const { signUpValidation, loginValidation } = require('../middleware/helper');

const router = Router();

router.post('/signUp', signUpValidation, userSignUp);
router.post('/Login', loginValidation, userLogin);





module.exports = router;