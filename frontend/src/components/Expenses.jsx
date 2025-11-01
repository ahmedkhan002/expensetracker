import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Dot, Tooltip } from 'recharts';
import { ArrowDownRight, ArrowUpRight, Download, Plus, X } from 'lucide-react';
import { useAppContext } from '../context/context'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import EmojiPicker from 'emoji-picker-react';
import * as XLSX from 'xlsx';

const Expenses = () => {
    const { internalActiveSection, user, getUser } = useAppContext();
    const [loading, setloading] = useState(false)
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [emoji, setEmoji] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        if (user?.expense && Array.isArray(user.expense)) {
            setExpenses(user.expense);
        }
    }, [user?.expense]);

    useEffect(() => {
        if (errors.expenseSource) {
            toast.error(errors.expenseSource.message);
        } else if (errors.expenseAmount) {
            toast.error(errors.expenseAmount.message);
        }
    }, [errors]);

    const chartData = expenses.map((expense, index) => {
        const amount = expense.expenseAmount || expense.ExpenseAmount;
        const date = expense.date || expense.Date || `Day ${index + 1}`;
        return { date: date, amount: Math.abs(amount || 0) };
    });

    const CustomDot = (props) => {
        const { cx, cy } = props;
        return <circle cx={cx} cy={cy} r={4} fill="#6366f1" stroke="#6366f1" strokeWidth={2} />;
    };

    const onSubmit = async (data) => {
        setloading(true)
        if (!emoji) {
            toast.error("Please select an emoji for your expense!");
            setloading(false)
            return;
        }

        const formData = {
            expenseSource: data.expenseSource,
            expenseAmount: Number(data.expenseAmount),
            expenseIcon: emoji,
        };

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/user/add-expense`,
                formData,
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success("Expense added successfully!");
                const newExpense = {
                    expenseSource: formData.expenseSource,
                    expenseAmount: -Math.abs(formData.expenseAmount),
                    expenseIcon: formData.expenseIcon,
                    date: new Date().toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    })
                };
                setExpenses(prev => [...prev, newExpense]);
                await getUser();
                reset();
                setEmoji(null);
                setloading(false)
                setOpen(false);
            } else {
                toast.error(res.data.message || "Something went wrong");
                setloading(false)
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "An unexpected error occurred";
            toast.error(message);
            setloading(false)
        }
    };

    const handleDownload = () => {
        if (expenses.length === 0) {
            toast.error("No expenses to download");
            return;
        }
        const worksheet = XLSX.utils.json_to_sheet(expenses.map((e) => ({
            Source: e.expenseSource || e.ExpenseSource,
            Amount: e.expenseAmount || e.ExpenseAmount,
            Icon: e.expenseIcon || e.ExpenseIcon,
            Date: e.date || e.Date,
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
        XLSX.writeFile(workbook, "expenses.xlsx");
    };

    return (
        <section className={`h-max min-h-200 w-full flex-col  ${internalActiveSection === "Expenses" ? "flex" : "hidden"}`}>
            <div className="w-full h-screen bg-gray-50 p-8">
                <div className="bg-white rounded-lg shadow-sm p-8 h-full">
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Expense Overview</h1>
                            <p className="text-sm text-gray-500">Track your spending trends over time and gain insights into where your money goes.</p>
                        </div>
                        <button onClick={() => setOpen(!open)} className="flex flex-nowrap text-nowrap h-max items-center cursor-pointer gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium text-sm">
                            <Plus size={16} /> Add Expense
                        </button>
                    </div>

                    <div className="w-full" style={{ height: 'calc(100% - 100px)' }}>
                        {chartData.length > 0 ? (
                            <ResponsiveContainer minWidth="100%" width="100%" minHeight="300px" height="80%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dx={-10} />
                                    <Tooltip formatter={(value) => [`$${value}`, 'Amount']} labelFormatter={(label) => `Date: ${label}`} />
                                    <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2.5} fill="url(#colorAmount)" dot={<CustomDot />} activeDot={{ r: 5, fill: '#6366f1' }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">No expense data available. Add your first expense to see the chart.</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-2xl m-8 p-5 shadow hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">All Expenses</h3>
                    <button onClick={handleDownload} className="text-sm text-gray-600 border border-gray-400 cursor-pointer px-2 rounded-md hover:border-purple-600 hover:text-purple-600 flex items-center transition-colors gap-1">
                        download <Download size={16} />
                    </button>
                </div>

                {expenses.length > 0 ? (
                    <ul className="space-y-4 flex flex-wrap px-5 justify-between gap-5">
                        {expenses.map((expense, index) => {
                            const source = expense.expenseSource || expense.ExpenseSource;
                            const amount = expense.expenseAmount || expense.ExpenseAmount;
                            const icon = expense.expenseIcon || expense.ExpenseIcon;
                            const date = expense.date || expense.Date || new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
                            return (
                                <li key={expense._id || index} className="flex justify-between min-w-100 items-center hover:bg-gray-50 rounded-lg p-2 transition">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{icon}</span>
                                        <div>
                                            <p className="font-medium text-gray-800">{source}</p>
                                            <p className="text-sm text-gray-500">{date}</p>
                                        </div>
                                    </div>
                                    <div>
                                        {amount > 0 ? (
                                            <p className="text-green-600 bg-green-100 rounded-lg px-2 font-medium flex items-center gap-1">
                                                +${(amount || 0).toLocaleString()} <ArrowUpRight size={14} />
                                            </p>
                                        ) : (
                                            <p className="text-red-500 bg-red-100 rounded-lg px-2 font-medium flex items-center gap-1">
                                                -${Math.abs(amount).toLocaleString()} <ArrowDownRight size={14} />
                                            </p>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="text-center py-4 text-gray-500">No expenses added yet.</div>
                )}
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-[90vw] max-w-md relative max-h-[75vh] overflow-y-auto">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-semibold">Add Expense</h2>
                            <X size={20} onClick={() => { setOpen(false); setShowEmojiPicker(false); }} className="cursor-pointer hover:text-purple-600" />
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Select Icon</label>
                                <div className="flex items-center gap-3">
                                    <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="border border-gray-300 rounded-md p-2 bg-gray-50 hover:bg-gray-100 transition">
                                        {emoji ? <span className="text-2xl">{emoji}</span> : "Pick Emoji"}
                                    </button>
                                    {!emoji && <span className="text-red-500 text-sm">Required</span>}
                                </div>
                                {showEmojiPicker && (
                                    <div className="mt-2 relative z-50">
                                        <EmojiPicker onEmojiClick={(e) => { setEmoji(e.emoji); setShowEmojiPicker(false); }} height={350} />
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Source</label>
                                <input type="text" className="border border-gray-300 rounded-md p-2 w-full" placeholder="e.g., Groceries"
                                    {...register("expenseSource", { required: "Source is required", minLength: { value: 3, message: "Source must be at least 3 characters long" } })} />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Amount</label>
                                <input type="number" step="0.01" className="border border-gray-300 rounded-md p-2 w-full" placeholder="Expense Amount"
                                    {...register("expenseAmount", { required: "Amount is required", min: { value: 0.01, message: "Amount must be greater than 0" } })} />
                            </div>

                            <button disabled={loading} type="submit" className={`transition-colors text-white rounded-md px-4 py-2 w-full ${loading ? 'cursor-not-allowed bg-gray-200 hover:bg-gray-200' : 'cursor-pointer bg-purple-600 hover:bg-purple-700'}`}>
                                {loading ? 'loading...' : 'Add Expense'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Expenses;
