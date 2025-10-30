import express from 'express'
import {deleteFile, uploadFile, userData, UserExpense, UserIncome } from '../controllers/userController.js'
import userAuth from '../middleWare/userAuth.js';
import { upload } from '../middleWare/multer.js';


const userRouter = express.Router()

userRouter.get('/user-data', userAuth, userData)
userRouter.post('/add-income', userAuth, UserIncome)
userRouter.post('/add-expense', userAuth, UserExpense)
userRouter.post('/upload', userAuth, upload.single('image'), uploadFile)
userRouter.post('/delete-file', userAuth, deleteFile)

export default userRouter;