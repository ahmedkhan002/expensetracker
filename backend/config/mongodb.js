import mongoose from "mongoose";
import 'dotenv/config'

const connectDB = async () => {
    try{
        mongoose.connect(process.env.DB_CONNECTION)
        console.log('MongoDB Connected')
    }catch(err){
        console.log(err.message)
    }
}

export default connectDB;