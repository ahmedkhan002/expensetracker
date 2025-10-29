import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import 'dotenv/config'
import transporter from "../config/nodeMailer.js";

export const register = async (req, res) => {
    const { fullname, email, password } = req.body

    if (!fullname || !email || !password) {
        return res.status(400).json({ success: false, message: 'missing credentials' });
    }

    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new userModel({ fullname, email, password: hashedPassword })
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to My Website',
            text: `Your account has been successfully created with email: ${user.email}`
        }
        await transporter.sendMail(mailOption)

        return res.json({ success: true, message: 'sign up successfull' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and Password are required' })
    }
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'Invalid Email Or Password' });
        }
        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.json({ success: false, message: 'Invalid Email Or Password' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true, message: 'login successfull' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.json({ success: true, message: 'loged out' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


export const isAuthenticated = async (req, res) => {
    try {
        res.json({ success: true })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
