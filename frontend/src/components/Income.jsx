import React, { useState, useEffect } from 'react';
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowDownRight, ArrowUpRight, Download, Plus, X } from 'lucide-react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import EmojiPicker from "emoji-picker-react";
import { useAppContext } from '../context/context'
import axios from 'axios'

const Income = () => {
    const { internalActiveSection, user, getUser } = useAppContext();
    const [loading, setloading] = useState(false)
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [emoji, setEmoji] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [incomes, setIncomes] = useState([]);

    useEffect(() => {
        if (errors.incomeSource) {
            toast.error(errors.incomeSource.message);
        } else if (errors.incomeAmount) {
            toast.error(errors.incomeAmount.message);
        }
    }, [errors]);

    useEffect(() => {
        if (user?.income && Array.isArray(user.income)) {
            setIncomes(user.income);
        }
    }, [user?.income]);

    const chartData = incomes.map((income) => ({
        name: income.incomeSource || income.IncomeSource,
        Amount: income.incomeAmount || income.IncomeAmount,
    }));

    const onSubmit = async (data) => {
        setloading(true)
        if (!emoji) {
            toast.error("Please select an emoji for your income source!");
            setloading(false)
            return;
        }

        const formData = {
            incomeSource: data.incomeSource,
            incomeAmount: Number(data.incomeAmount),
            incomeIcon: emoji,
        };

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/user/add-income`,
                formData,
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success("Income added successfully!");
                const newIncome = {
                    incomeSource: formData.incomeSource,
                    incomeAmount: formData.incomeAmount,
                    incomeIcon: formData.incomeIcon,
                    date: new Date().toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    })
                };

                setIncomes(prev => [...prev, newIncome]);
                await getUser();
                setloading(false)
                reset();
                setEmoji(null);
                setOpen(false);
            } else {
                toast.error(res.data.message || "Something went wrong");
                setloading(false)
            }
        } catch (err) {
            const message =
                err?.response?.data?.message || err?.message || "An unexpected error occurred";
            toast.error(message);
            setloading(false)
        }
    };

    return (
        <section className={`mb-20 h-2000 flex-col  ${internalActiveSection === "Income" ? "flex" : "hidden"}`}>
            <div className="bg-white shadow-md overflow-hidden rounded-2xl m-8 p-8 transition flex-col justify-center">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-start font-semibold text-lg">Income Overview</h1>
                        <p className='text-gray-500 mb-4 text-sm'>Track your earnings over time and analyze your income trends.</p>
                    </div>
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex h-max items-center cursor-pointer gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium text-sm"
                    >
                        <Plus size={16} />
                        Add Income
                    </button>
                </div>

                {chartData.length > 0 ? (
                    <BarChart
                        width={800}
                        height={400}
                        data={chartData}
                        margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
                    >
                        <YAxis />
                        <XAxis dataKey="name" />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm text-sm">
                                            <p className="font-semibold text-gray-800">{data.name}</p>
                                            <p className="text-gray-600">Amount: ${data.Amount}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="Amount" fill="#8884d8" />
                    </BarChart>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No income data available. Add your first income to see the chart.
                    </div>
                )}
            </div>

            <div className="flex-1 bg-white rounded-2xl m-8 p-5 shadow hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Income Sources</h3>
                    <button className="text-sm text-gray-600 border border-gray-400 cursor-pointer px-2 rounded-md hover:border-purple-600 hover:text-purple-600 flex items-center transition-colors gap-1">
                        download <Download size={16} />
                    </button>
                </div>

                {incomes.length >= 0 ? (
                    <ul className="space-y-4 flex flex-wrap px-2 justify-between gap-5">
                        {incomes.map((income, index) => {
                            const source = income.incomeSource || income.IncomeSource;
                            const amount = income.incomeAmount || income.IncomeAmount;
                            const icon = income.incomeIcon || income.IncomeIcon;
                            const date = income.date || income.Date || new Date().toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            });

                            return (
                                <li
                                    key={income._id || index}
                                    className="flex justify-between min-w-100 items-center hover:bg-gray-50 rounded-lg p-2 transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{icon}</span>
                                        <div>
                                            <p className="font-medium text-gray-800">{source}</p>
                                            <p className="text-sm text-gray-500">{date}</p>
                                        </div>
                                    </div>
                                    <div>
                                        {amount >= 0 ? (
                                            <p className="text-green-600 bg-green-100 rounded-lg px-2 font-medium flex items-center gap-1">
                                                +${(amount || 0).toLocaleString()} <ArrowUpRight size={14} />
                                            </p>
                                        ) : (
                                            <p className="text-red-500 bg-red-100 rounded-lg px-2 font-medium flex items-center gap-1">
                                                -${Math.abs(amount).toLocaleString()}{" "}
                                                <ArrowDownRight size={14} />
                                            </p>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="text-center py-4 text-gray-500">
                        No income sources added yet.
                    </div>
                )}
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-[90vw] max-w-md relative max-h-[75vh] overflow-y-auto">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-semibold">Add Income</h2>
                            <X
                                size={20}
                                onClick={() => {
                                    setOpen(false);
                                    setShowEmojiPicker(false);
                                }}
                                className="cursor-pointer hover:text-purple-600"
                            />
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Select Icon</label>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                        className="border border-gray-300 rounded-md p-2 bg-gray-50 hover:bg-gray-100 transition"
                                    >
                                        {emoji ? (
                                            <span className="text-2xl">{emoji}</span>
                                        ) : (
                                            "Pick Emoji"
                                        )}
                                    </button>
                                    {!emoji && <span className="text-red-500 text-sm">Required</span>}
                                </div>

                                {showEmojiPicker && (
                                    <div className="mt-2 relative z-50">
                                        <EmojiPicker
                                            onEmojiClick={(e) => {
                                                setEmoji(e.emoji);
                                                setShowEmojiPicker(false);
                                            }}
                                            height={350}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Source</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    placeholder="e.g., Freelance"
                                    {...register("incomeSource", {
                                        required: "Source is required",
                                        minLength: {
                                            value: 3,
                                            message: "Source must be at least 3 characters long"
                                        }
                                    })}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Amount</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    placeholder="Income Amount"
                                    {...register("incomeAmount", {
                                        required: "Amount is required",
                                        min: { value: 0.01, message: "Amount must be greater than 0" },
                                    })}
                                />
                            </div>

                            <button
                                type="submit"
                                className={`transition-colors text-white rounded-md px-4 py-2 w-full ${loading ? 'cursor-not-allowed bg-gray-200 hover:bg-gray-200' : 'cursor-pointer bg-purple-600 hover:bg-purple-700'}`}
                            >
                                {loading ? 'loading...' : 'Add Income'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Income;