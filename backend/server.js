import express from 'express'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
    "https://expensetracker-ashen-mu.vercel.app",
    "http://localhost:5173"
];
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
connectDB()

app.get('/', (req, res) => {
    res.send('this is response')
})

app.listen(port, () => {
    console.log(`Server is running at Port ${port}`)
}) 