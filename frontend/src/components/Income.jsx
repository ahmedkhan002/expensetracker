import React from 'react'
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useAppContext } from '../context/context'
import { ArrowDownRight, ArrowUpRight, Download, Plus } from 'lucide-react';

const Income = ({ showPage }) => {
    const { internalActiveSection } = useAppContext();
    const data = [
        {
            name: 'Shopping',
            Amount: 430,
        },
        {
            name: 'Travel',
            Amount: 670,
        },
        {
            name: 'Electricity Bill',
            Amount: 200,
        },
        {
            name: 'Loan Repayment',
            Amount: 600,
        },
        {
            name: 'Loan Repayment',
            Amount: 800,
        },
        {
            name: 'Loan Repayment',
            Amount: 400,
        },
        {
            name: 'Loan Repayment',
            Amount: 350,
        },
        {
            name: 'Loan Repayment',
            Amount: 500,
        },
        {
            name: 'Loan Repayment',
            Amount: 200,
        },
        {
            name: 'Loan Repayment',
            Amount: 250,
        },

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
    return (
        <section className={`mb-20 flex-col  ${internalActiveSection === "Income" ? "flex" : "hidden"}`}>
            <div className={`bg-white shadow-md overflow-hidden rounded-2xl m-8 p-8 transition flex-col justify-center`}>
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-start font-semibold text-lg">Income Overview</h1>
                        <p className='text-gray-500 mb-4 text-sm'>Track your earnings over time and analye your income trends.</p>
                    </div>
                    <button className="flex h-max items-center cursor-pointer gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium text-sm">
                        <Plus size={16} />
                        Add Income
                    </button>
                </div>
                <BarChart
                    style={{ width: '100%', maxHeight: '50vh', aspectRatio: 1.618 }}
                    responsive
                    data={data}
                    margin={{
                        top: 20,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <YAxis width="auto" />
                    <XAxis width="auto" />
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
            </div>

            <div className="flex-1 bg-white rounded-2xl m-8 p-5 shadow hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Income Sources</h3>
                    <button className="text-sm text-gray-600 border border-gray-400 cursor-pointer px-2 rounded-md hover:border-purple-600 hover:text-purple-600 flex items-center transition-colors gap-1">
                        download <Download size={16} />
                    </button>
                </div>
                <ul className="space-y-4 flex flex-wrap px-2 justify-between gap-5">
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
    )
}

export default Income
