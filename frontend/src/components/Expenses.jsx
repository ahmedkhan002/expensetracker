import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Dot, Tooltip } from 'recharts';
import { ArrowDownRight, ArrowUpRight, Download, Plus } from 'lucide-react';
import { useAppContext } from '../context/context'

const Expenses = () => {
    const { internalActiveSection } = useAppContext();

    const data = [
        { date: '2nd Jan', amount: 500 },
        { date: '3rd Jan', amount: 180 },
        { date: '4th Jan', amount: 140 },
        { date: '5th Jan', amount: 260 },
        { date: '6th Jan', amount: 120 },
        { date: '7th Jan', amount: 620 },
        { date: '8th Jan', amount: 480 },
        { date: '9th Jan', amount: 340 },
        { date: '10th Jan', amount: 720 },
        { date: '11th Jan', amount: 800 },
        { date: '12th Jan', amount: 860 },
        { date: '14th Jan', amount: 280 },
        { date: '16th Feb', amount: 640 },
        { date: '11th Feb', amount: 200 },
        { date: '17th Feb', amount: 680 },
        { date: '17th Feb', amount: 420 },
    ];

    const transactions = [
        { id: 1, name: "Shopping", date: "17th Feb 2025", amount: -30, icon: "🛍️" },
        { id: 2, name: "Travel", date: "13th Feb 2025", amount: -70, icon: "✈️" },
        { id: 3, name: "Salary", date: "12th Feb 2025", amount: 180, icon: "💼" },
        { id: 4, name: "Electricity Bill", date: "11th Feb 2025", amount: -200, icon: "💡" },
        { id: 5, name: "Loan Repayment", date: "10th Feb 2025", amount: -600, icon: "🏦" },
        { id: 6, name: "Salary", date: "17th Feb 2025", amount: 1200, icon: "🛍️" },
        { id: 7, name: "Interest from Savings", date: "13th Feb 2025", amount: 70, icon: "✈️" },
        { id: 8, name: "E-commerce Sales", date: "12th Feb 2025", amount: 180, icon: "💼" },
        { id: 9, name: "Graphing Design", date: "11th Feb 2025", amount: 200, icon: "💡" },
        { id: 10, name: "Affiliate Marketing", date: "10th Feb 2025", amount: 600, icon: "🏦" },
    ];

    const CustomDot = (props) => {
        const { cx, cy } = props;
        return (
            <circle
                cx={cx}
                cy={cy}
                r={4}
                fill="#6366f1"
                stroke="#6366f1"
                strokeWidth={2}
            />
        );
    };

    return (
        <section className={`mb-20 flex-col  ${internalActiveSection === "Expenses" ? "flex" : "hidden"}`}>
            <div className="w-full h-screen bg-gray-50 p-8">
                <div className="bg-white rounded-lg shadow-sm p-8 h-full">
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                                Expense Overview
                            </h1>
                            <p className="text-sm text-gray-500">
                                Track your spending trends over time and gain insights into where your money goes.
                            </p>
                        </div>
                        <button className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium text-sm">
                            <Plus size={16} />
                            Add Expense
                        </button>
                    </div>

                    <div className="w-full" style={{ height: 'calc(100% - 100px)' }}>
                        <ResponsiveContainer minWidth="100%" width="100%" minHeight="300px" height="80%">
                            <AreaChart
                                data={data}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                                    ticks={[0, 250, 500, 750, 1000]}
                                    dx={-10}
                                />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#6366f1"
                                    strokeWidth={2.5}
                                    fill="url(#colorAmount)"
                                    dot={<CustomDot />}
                                    activeDot={{ r: 5, fill: '#6366f1' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-2xl m-8 p-5 shadow hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">All Expenses</h3>
                    <button className="text-sm text-gray-600 border border-gray-400 cursor-pointer px-2 rounded-md hover:border-purple-600 hover:text-purple-600 flex items-center transition-colors gap-1">
                        download <Download size={16} />
                    </button>
                </div>
                <ul className="space-y-4 flex flex-wrap px-5 justify-between gap-5">
                    {transactions.map((t) => (
                        <li
                            key={t.id}
                            className="flex justify-between min-w-100 items-center hover:bg-gray-50 rounded-lg p-2 transition"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{t.icon}</span>
                                <div>
                                    <p className="font-medium text-gray-800">{t.name}</p>
                                    <p className="text-sm text-gray-500">{t.date}</p>
                                </div>
                            </div>
                            <div>
                                {t.amount > 0 ? (
                                    <p className="text-green-600 bg-green-100 rounded-lg px-2 font-medium flex items-center gap-1">
                                        +${t.amount.toLocaleString()} <ArrowUpRight size={14} />
                                    </p>
                                ) : (
                                    <p className="text-red-500 bg-red-100 rounded-lg px-2 font-medium flex items-center gap-1">
                                        -${Math.abs(t.amount).toLocaleString()}{" "}
                                        <ArrowDownRight size={14} />
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Expenses;