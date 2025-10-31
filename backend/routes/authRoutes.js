import express from 'express'
import { isAuthenticated, login, logout, register } from '../controllers/authController.js'
import userAuth from '../middleWare/userAuth.js'
import { upload } from '../middleWare/multer.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', upload.single('profileImage'), register)
router.use('/logout', logout)
router.get('/is-auth', userAuth, isAuthenticated)

export default router