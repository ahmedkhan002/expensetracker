import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Eye, EyeOff, Upload, User } from "lucide-react";
import axios from 'axios'
import toast from "react-hot-toast";

const SignupForm = ({ onChange }) => {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setProfileImage(Object.assign(file, { preview: URL.createObjectURL(file) }));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false,
    });

    const onSubmit = async (data) => {
        const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/auth/register', { ...data, profileImage });
        if (res.data.success === true) {
            toast.success('Account Created Successfully!')
            onChange('login')
        } else {
            toast.error(res.data.message)
        }
    };

    return (
        <section className="flex justify-center max-lg:mx-auto items-center min-h-screen w-[90%]  font-sans">
            <div className="w-full">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Create an Account
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Join us today by entering your details below.
                    </p>
                </div>

                <div
                    {...getRootProps()}
                    className="flex flex-col items-center w-max mx-auto mb-8 cursor-pointer"
                >
                    <input {...getInputProps()} />
                    <div className="relative w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center border border-gray-200">
                        {profileImage ? (
                            <img
                                src={profileImage.preview}
                                alt="profile preview"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        ) : (
                            <User className="text-[#6757ac]" size={36} />
                        )}
                        <div className="absolute bottom-0 right-0 bg-[#6757ac] rounded-full p-1">
                            <Upload size={14} className="text-white" />
                        </div>
                    </div>
                    {isDragActive && (
                        <p className="text-xs text-gray-500 mt-2">Drop image here...</p>
                    )}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="flex flex-col md:flex-row md:space-x-5 space-y-5 md:space-y-0">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-800 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="John"
                                {...register("fullname")}
                                className="w-full px-4 py-3 rounded-md border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6757ac] placeholder-gray-400"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-800 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                {...register("email")}
                                className="w-full px-4 py-3 rounded-md border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6757ac] placeholder-gray-400"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Min 8 Characters"
                                {...register("password")}
                                className="w-full px-4 py-3 rounded-md border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6757ac] placeholder-gray-400"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#6757ac] cursor-pointer hover:bg-[#6757ac7c] hover:text-[#5d49b6] text-white font-semibold py-3 rounded-md transition duration-200"
                    >
                        SIGN UP
                    </button>

                </form>
                <p className="text-sm max-lg:text-center mt-2 text-gray-700">
                    Already have an account?{" "}
                    <button
                        onClick={() => onChange('login')}
                        className="text-[#6757ac] cursor-pointer font-medium hover:underline">
                        Login
                    </button>
                </p>
            </div>
        </section>
    );
};

export default SignupForm;
