import express from 'express'
import {isAuthenticated, login, logout, register} from '../controllers/authController.js'
import userAuth from '../middleWare/userAuth.js'

const router = express.Router()

router.use('/login', login)
router.use('/register', register)
router.use('/logout', logout)
router.use('/is-auth', userAuth, isAuthenticated)

export default router