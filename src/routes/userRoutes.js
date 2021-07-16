const { Router } = require('express');
const { userCreatePlaylist, addSongToPlayList, deletePlayList, userSearchSong, userViewSong, userViewAllSongs, viewProfile, UpdatePic, allSearchSongs, userSongs, UserUploadSong, viewSong, numberOfPlays } = require('../controllers/userControlle');
const { requiredLogin } = require('../middleware/isLoggedIn');
const fileUpload = require('express-fileupload');

const router = Router();
router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    debug: true,
    limits: {
      fileSize: 15 * 1024 * 1024,
    },
    abortOnLimit: true,
    responseOnLimit: 'File too large',
  })
);


router.post('/createPlayList', requiredLogin, userCreatePlaylist);
router.post('/addSongToPlayList', requiredLogin, addSongToPlayList);
router.delete('/deletePlayList', requiredLogin, deletePlayList);
router.get('/searchSong', requiredLogin, userSearchSong);
router.get('/viewSong', requiredLogin, userViewSong);
router.get('/allSongs', requiredLogin, userViewAllSongs);
router.get('/viewProfile', requiredLogin, viewProfile);
router.post('/updatePic', requiredLogin, UpdatePic);
router.get('/allKSongs', requiredLogin, allSearchSongs);
router.get("/userSongs", requiredLogin, userSongs);
router.post("/uploadSong", requiredLogin, UserUploadSong);
router.patch("/view", requiredLogin, viewSong);
router.get('/plays', requiredLogin, numberOfPlays);






module.exports = router;