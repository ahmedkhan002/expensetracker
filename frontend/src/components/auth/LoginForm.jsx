import React from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const LoginForm = ({ onChange }) => {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/auth/login', { ...data });
        if (res.data.success === true) {
            toast.success('Login Successfull!')
            navigate('/home');
        } else {
            toast.error(res.data.message)
        }
    };

    return (
        <section className="flex justify-center items-center max-lg:mx-auto min-h-screen w-[70%] max-sm:w-[80%] font-sans">
            <div className="w-full ">
                <div className="mb-6 max-lg:text-center">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Please enter your details to log in
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            {...register("email")}
                            className="w-full px-4 py-3 rounded-md border bg-slate-100 border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6757ac] placeholder-gray-400"
                            required
                        />
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
                                className="w-full px-4 py-3 rounded-md border bg-slate-100 border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6757ac] placeholder-gray-400"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#6757ac] cursor-pointer hover:bg-[#6757ac7c] hover:text-[#5d49b6] text-white font-semibold py-3 rounded-md transition duration-200"
                    >
                        LOGIN
                    </button>
                </form>
                <p className="text-sm max-lg:text-center mt-2 text-gray-700">
                    Don’t have an account?{" "}
                    <button
                        onClick={() => onChange('signup')}
                        className="text-[#6757ac] cursor-pointer font-medium hover:underline">
                        SignUp
                    </button>
                </p>
            </div>
        </section>
    );
};

export default LoginForm;
