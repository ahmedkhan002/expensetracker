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
                email: user.email,
                income: user.UserIncome,
                expense: user.UserExpenses
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


export const UserIncome = async (req, res) => {
    try {
        const { incomeSource, incomeAmount, incomeIcon } = req.body;

        if (!incomeSource || !incomeAmount || !incomeIcon) {
            return res.json({ success: false, message: "Missing Details" });
        }

        const userId = req.userId;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "No user found" });
        }

        user.UserIncome.push({
            IncomeSource: incomeSource,
            IncomeAmount: incomeAmount,
            IncomeIcon: incomeIcon,
        })

        await user.save();

        return res.json({ success: true, message: "Income updated successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const UserExpense = async (req, res) => {
    try {
        const { expenseSource, expenseAmount, expenseIcon } = req.body;

        if (!expenseSource || !expenseAmount || !expenseIcon) {
            return res.json({ success: false, message: "Missing Details" })
        }
        const userId = req.userId;
        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: 'No User Found' })
        }
        user.UserExpenses.push({
            ExpenseSource: expenseSource,
            ExpenseAmount: expenseAmount,
            ExpenseIcon: expenseIcon,
        });
        await user.save();

        return res.json({ success: true, message: "Expense updated successfully" });

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
