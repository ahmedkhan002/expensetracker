import userModel from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import fs from 'fs';
import { deleteFromCloudinary, uploadOnCLoudinary } from "../config/cloudinary.js";

export const userData = async (req, res) => {
    try {
        const { userId } = req.userId;
        const user = await userModel.findOne(userId)
        if (!user) {
            return res.json({ success: false, message: 'No User Found' })
        }
        return res.json({
            success: true,
            userData: {
                name: user.fullname,
                profilePhoto: user.url,
                profileId: user.profileID,
            }
        })
    } catch (error) {
        return res.json({ success: false, message: error.messsage })
    }
}

export const uploadFile = async (req, res) => {
    try {
        const filePath = req.file?.path;
        const { userId } = req.userId;

        const user = await userModel.findOne(userId)

        if (!user) {
            return res.json({ success: false, message: 'No User Found' })
        }

        if (!user.isUserVerified) {
            res.json({ success: false, message: 'User is not verified' })
        }

        if (!filePath) {
            return res.json({ success: false, message: 'No File Found!' });
        }
        const result = await uploadOnCLoudinary(filePath);

        user.url = result.secure_url
        user.profileID = result.public_id
        await user.save()
        fs.unlinkSync(filePath);

        res.json({
            success: true,
            url: result.secure_url,
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const deleteFile = async (req, res) => {
    try {
        const { profileID } = req.body;
        const { userId } = req.userId;

        if (!profileID) return res.json({ success: false, message: 'profile id required' })
        const user = await userModel.findOne(userId)

        if (!user) {
            return res.json({ success: false, message: 'No User Found' })
        }

        const result = await deleteFromCloudinary(profileID);

        if (result.result === "ok") {
            user.url = null
            user.profileID = null
            await user.save()
            return res.json({ success: true, message: "File deleted successfully" });
        } else {
            return res.json({ success: false, message: "Delete failed", result });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


