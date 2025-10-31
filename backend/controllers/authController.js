import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import 'dotenv/config'
import transporter from "../config/nodeMailer.js";
import validator from "validator";
import { uploadOnCLoudinary } from "../config/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const filePath = req.file?.path || null;

    if (!fullname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const errors = [];
    if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(fullname.trim())) {
      errors.push("Full name must contain only letters and spaces");
    }
    if (fullname.trim().length < 3) {
      errors.push("Full name must be at least 3 characters long");
    }
    if (!validator.isEmail(email)) {
      errors.push("Please enter a valid email address");
    }
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 0,
        minSymbols: 1,
      })
    ) {
      errors.push(
        "Password must be at least 8 characters and include uppercase, lowercase, and special character"
      );
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.join(", "),
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    let result = { secure_url: null, public_id: null };
    if (filePath) {
      const uploaded = await uploadOnCLoudinary(filePath);
      if (uploaded && uploaded.secure_url) {
        result.secure_url = uploaded.secure_url;
        result.public_id = uploaded.public_id;
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      fullname,
      email,
      password: hashedPassword,
      url: result.secure_url || null,
      profileID: result.public_id || null,
    });

    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to My Website 🎉",
      text: `Hi ${fullname}, your account has been successfully created with email: ${user.email}`,
    });

    return res.json({
      success: true,
      message: "Sign up successful! Welcome aboard 🎉",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        profileUrl: user.url,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};



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
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
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
      secure: true,
      sameSite: 'none',
      path: '/',
    })
    return res.json({ success: true, message: 'logged out successfully' })

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
