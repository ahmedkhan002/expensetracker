import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CD_CLOUD_NAME,
  api_key: process.env.CD_API_KEY,
  api_secret: process.env.CD_API_SECRET,
});

export const uploadOnCLoudinary = async (filePath) => {
  try {
    if (!filePath) {
      console.log("⚠️ No file path provided to Cloudinary");
      return null;
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder: "expense-tracker-users",
      resource_type: "auto",
    });

    console.log("✅ Uploaded successfully:", result.secure_url);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return result;
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    return null;
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
    console.log("File deleted from Cloudinary:", result);
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw error;
  }
};
