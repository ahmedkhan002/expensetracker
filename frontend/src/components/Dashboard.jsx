import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, HandCoins, WalletMinimal, CreditCard } from "lucide-react";
import {useAppContext} from '../context/context'

const Dashboard = ({showPage}) => {
  const {internalActiveSection} = useAppContext();
  const data = [
    { name: "Total Balance", value: 100, color: "#6B46C1" },
    { name: "Total Expenses", value: 80, color: "#EF4444" },
    { name: "Total Income", value: 180, color: "#F97316" },
  ];

  const data2 = [
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

  ];

  const data3 = [
    { name: "Salary", value: 1200, color: "#6B46C1" },
    { name: "Interest from Savings", value: 70, color: "#EF4444" },
    { name: "E-commerce Sales", value: 180, color: "#F97316" },
    { name: "Graphing Design", value: 200, color: "#e1e433" },
    { name: "Affiliate Marketing", value: 600, color: "#6dbe5e" },
  ];

  const transactions = [
    { id: 1, name: "Shopping", date: "17th Feb 2025", amount: -30, icon: "🛍️" },
    { id: 2, name: "Travel", date: "13th Feb 2025", amount: -70, icon: "✈️" },
    { id: 3, name: "Salary", date: "12th Feb 2025", amount: 180, icon: "💼" },
    { id: 4, name: "Electricity Bill", date: "11th Feb 2025", amount: -200, icon: "💡" },
    { id: 5, name: "Loan Repayment", date: "10th Feb 2025", amount: -600, icon: "🏦" },
  ];
  const expanses = [
    { id: 1, name: "Shopping", date: "17th Feb 2025", amount: -30, icon: "🛍️" },
    { id: 2, name: "Travel", date: "13th Feb 2025", amount: -70, icon: "✈️" },
    { id: 4, name: "Electricity Bill", date: "11th Feb 2025", amount: -200, icon: "💡" },
    { id: 5, name: "Loan Repayment", date: "10th Feb 2025", amount: -600, icon: "🏦" },
  ];
  const income = [
    { id: 1, name: "Salary", date: "17th Feb 2025", amount: 1200, icon: "🛍️" },
    { id: 2, name: "Interest from Savings", date: "13th Feb 2025", amount: 70, icon: "✈️" },
    { id: 3, name: "E-commerce Sales", date: "12th Feb 2025", amount: 180, icon: "💼" },
    { id: 4, name: "Graphing Design", date: "11th Feb 2025", amount: 200, icon: "💡" },
    { id: 5, name: "Affiliate Marketing", date: "10th Feb 2025", amount: 600, icon: "🏦" },
  ];

  return (
    <div className={` w-full mb-210 h-180 flex-col lg:flex-row bg-gray-50 ${internalActiveSection === "Dashboard" ? "flex" : "hidden"}`}>
      <div className="flex-1 flex flex-col">
        <main className="p-6 max-sm:px-2 flex flex-col gap-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[250px] bg-white rounded-2xl p-5 shadow hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-600 text-white rounded-xl">
                  <CreditCard />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Balance</p>
                  <h2 className="text-xl font-semibold">$100</h2>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-[250px] bg-white rounded-2xl p-5 shadow hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-500 text-white rounded-xl">
                  <WalletMinimal />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Income</p>
                  <h2 className="text-xl font-semibold">$180</h2>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-[250px] bg-white rounded-2xl p-5 shadow hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-500 text-white rounded-xl">
                  <HandCoins />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Expenses</p>
                  <h2 className="text-xl font-semibold">$80</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white rounded-2xl p-5 shadow hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Recent Transactions</h3>
                <button className="text-sm text-gray-600 hover:text-purple-600 flex items-center gap-1">
                  See All <ArrowUpRight size={16} />
                </button>
              </div>
              <ul className="space-y-4">
                {transactions.map((t) => (
                  <li
                    key={t.id}
                    className="flex justify-between items-center hover:bg-gray-50 rounded-lg p-2 transition"
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

            <div className="flex-1 bg-white rounded-2xl p-5 shadow hover:shadow-md transition flex flex-col items-center justify-center">
              <h1 className="font-semibold text-lg mb-4">Financial Overview</h1>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((v, i) => (
                      <Cell key={i} fill={v.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center mt-2 text-gray-600 font-medium">
                Total Balance: <span className="text-black">$100</span>
              </p>
            </div>
          </div>

          {/* Expanses */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white rounded-2xl p-5 shadow hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Expanses</h3>
                <button className="text-sm text-gray-600 hover:text-purple-600 flex items-center gap-1">
                  See All <ArrowUpRight size={16} />
                </button>
              </div>
              <ul className="space-y-4">
                {expanses.map((t) => (
                  <li
                    key={t.id}
                    className="flex justify-between items-center hover:bg-gray-50 rounded-lg p-2 transition"
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

            <div className="flex-1 bg-white rounded-2xl p-5 shadow hover:shadow-md transition flex flex-col items-center justify-center">
              <h1 className="text-start font-semibold text-lg mb-4">Last 30 Days Expanses</h1>
              <BarChart
                style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                responsive
                data={data2}
                margin={{
                  top: 20,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis width="auto" />
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
          </div>

          {/* 60 days income */}
          <div className="flex flex-col lg:flex-row gap-6">

            <div className="flex-1 bg-white rounded-2xl p-5 shadow hover:shadow-md transition flex flex-col items-center justify-center">
              <h1 className="font-semibold text-lg mb-4">Last 60 Days Income</h1>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data3}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((v, i) => (
                      <Cell key={i} fill={v.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1 bg-white rounded-2xl p-5 shadow hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Income</h3>
                <button className="text-sm text-gray-600 hover:text-purple-600 flex items-center gap-1">
                  See All <ArrowUpRight size={16} />
                </button>
              </div>
              <ul className="space-y-4">
                {income.map((t) => (
                  <li
                    key={t.id}
                    className="flex justify-between items-center hover:bg-gray-50 rounded-lg p-2 transition"
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
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
