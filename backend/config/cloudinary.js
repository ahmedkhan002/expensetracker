import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import 'dotenv/config'

cloudinary.config({
    cloud_name: process.env.CD_CLOUD_NAME,
    api_key: process.env.CD_API_KEY,
    api_secret: process.env.CD_API_SECRET
});

export const uploadOnCLoudinary = async (file) => {
    try {
        if (!file) return null;

        const res = await cloudinary.uploader.upload(file, {
            resource_type: 'auto'
        })

        console.log('file uploaded successfully', res.url)
        return res;
    } catch (error) {
        fs.unlinkSync(file);
        return error;
    }
}

export const deleteFromCloudinary = async (publicId) => {
    try {
        const res = await cloudinary.uploader.destroy(publicId, { invalidate: true });
        console.log("File deleted:", res);
        return res;
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        throw error;
    }
};