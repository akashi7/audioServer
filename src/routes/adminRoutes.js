import { Router } from 'express';
import fileUpload from 'express-fileupload';
import { adminUploadSong, adminViewUsers } from '../controllers/adminControlle';
import { requiredLogin } from '../middleware/isAdmin';

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



export default router;