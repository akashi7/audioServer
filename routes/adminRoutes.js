const { Router } = require('express');
const fileUpload = require('express-fileupload');
const { adminUploadSong, adminViewUsers } = require('../controllers/adminControlle');
const { requiredLogin } = require('../middleware/isAdmin');

const router = Router();

router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    debug: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
    abortOnLimit: true,
    responseOnLimit: 'File too large',
  })
);

router.post('/uploadSong', requiredLogin, adminUploadSong);
router.get('/all', requiredLogin, adminViewUsers);



module.exports = router;