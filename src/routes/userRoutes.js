import { Router } from 'express';
import { userCreatePlaylist, addSongToPlayList, deletePlayList, userSearchSong, userViewSong, userViewAllSongs, viewProfile } from '../controllers/userControlle';
import { requiredLogin } from '../middleware/isLoggedIn';


const router = Router();



router.post('/createPlayList', requiredLogin, userCreatePlaylist);
router.post('/addSongToPlayList', requiredLogin, addSongToPlayList);
router.delete('/deletePlayList', requiredLogin, deletePlayList);
router.get('/searchSong', requiredLogin, userSearchSong);
router.get('/viewSong', requiredLogin, userViewSong);
router.get('/allSongs', requiredLogin, userViewAllSongs);
router.get('/viewProfile', requiredLogin, viewProfile);





export default router;