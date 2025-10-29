import express from 'express'
import {deleteFile, uploadFile, userData } from '../controllers/userController.js'
import userAuth from '../middleWare/userAuth.js';
import { upload } from '../middleWare/multer.js';


const userRouter = express.Router()

userRouter.get('/user-data', userAuth, userData)
userRouter.post('/upload', userAuth, upload.single('image'), uploadFile)
userRouter.post('/delete-file', userAuth, deleteFile)

export default userRouter;