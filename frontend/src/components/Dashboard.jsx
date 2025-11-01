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
import { useAppContext } from '../context/context'
import { useState, useEffect } from 'react'

const Dashboard = ({ showPage }) => {
  const { internalActiveSection, setInternalActiveSection, user } = useAppContext();
  const [expenses, setExpenses] = useState([])
  const [incomes, setIncomes] = useState([])
  
  const totalIncome = incomes.reduce((sum, income) => {
    const amount = income.IncomeAmount || income.incomeAmount || 0;
    return sum + Math.abs(amount);
  }, 0);

  const totalExpenses = expenses.reduce((sum, expense) => {
    const amount = expense.ExpenseAmount || expense.expenseAmount || 0;
    return sum + Math.abs(amount);
  }, 0);

  const totalBalance = totalIncome - totalExpenses;

  const pieChartData = [
    { name: "Total Balance", value: totalBalance, color: "#6B46C1" },
    { name: "Total Expenses", value: totalExpenses, color: "#EF4444" },
    { name: "Total Income", value: totalIncome, color: "#F97316" },
  ];

  useEffect(() => {
    if (user?.expenses && Array.isArray(user.expenses)) {
      setExpenses(user.expenses);
    } else if (user?.expenses && Array.isArray(user.expenses)) {
      setExpenses(user.expenses);
    } else if (user?.expense && Array.isArray(user.expense)) {
      setExpenses(user.expense);
    }

    if (user?.UserIncome && Array.isArray(user.UserIncome)) {
      setIncomes(user.UserIncome);
    } else if (user?.income && Array.isArray(user.income)) {
      setIncomes(user.income);
    }
  }, [user]);

  const recentTransactions = [...expenses.slice(-3).map(expense => ({
      id: expense._id || `expense-${Date.now()}`,
      name: expense.ExpenseSource || expense.expenseSource || 'Expense',
      date: expense.date || new Date().toLocaleDateString(),
      amount: -(expense.ExpenseAmount || expense.expenseAmount || 0),
      icon: expense.ExpenseIcon || expense.expenseIcon || '💰'
    })),
    ...incomes.slice(-2).map(income => ({
      id: income._id || `income-${Date.now()}`,
      name: income.IncomeSource || income.incomeSource || 'Income',
      date: income.date || new Date().toLocaleDateString(),
      amount: Math.abs(income.IncomeAmount || income.incomeAmount || 0),
      icon: income.IncomeIcon || income.incomeIcon || '💵'
    }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <div className={` w-full h-max min-h-200 flex-col lg:flex-row bg-gray-50 ${internalActiveSection === "Dashboard" ? "flex" : "hidden"}`}>
      <div className="flex-1 flex flex-col">
        <main className="p-6 max-sm:px-2 flex flex-col gap-6">
          {/* calculations */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[250px] bg-white rounded-2xl p-5 shadow hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-600 text-white rounded-xl">
                  <CreditCard />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Balance</p>
                  <h2 className="text-xl font-semibold">${totalBalance.toLocaleString()}</h2>
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
                  <h2 className="text-xl font-semibold">${totalIncome.toLocaleString()}</h2>
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
                  <h2 className="text-xl font-semibold">${totalExpenses.toLocaleString()}</h2>
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
                {recentTransactions.length > 0 ? recentTransactions.map((t) => (
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
                )) : (
                  <p className="text-gray-500 text-center py-4">No transactions yet</p>
                )}
              </ul>
            </div>

            <div className="flex-1 bg-white rounded-2xl p-5 shadow hover:shadow-md transition flex flex-col items-center justify-center">
              <h1 className="font-semibold text-lg mb-4">Financial Overview</h1>
              {totalIncome > 0 || totalExpenses > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieChartData.map((v, i) => (
                          <Cell key={i} fill={v.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  <p className="text-center mt-2 text-gray-600 font-medium">
                    Total Balance: <span className="text-black">${totalBalance.toLocaleString()}</span>
                  </p>
                </>
              ) : (
                <p className="text-gray-500">No financial data available</p>
              )}
            </div>
          </div>

          {/* Expenses */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white rounded-2xl p-5 shadow hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Recent Expenses</h3>
                <button onClick={() => setInternalActiveSection('Expenses')} className="text-sm cursor-pointer text-gray-600 hover:text-purple-600 flex items-center gap-1">
                  See All <ArrowUpRight size={16} />
                </button>
              </div>
              <ul className="space-y-4">
                {expenses.length > 0 ? expenses.slice(-5).map((expense, index) => {
                  const amount = expense.ExpenseAmount || expense.expenseAmount || 0;
                  const source = expense.ExpenseSource || expense.expenseSource || 'N/A';
                  const icon = expense.ExpenseIcon || expense.expenseIcon || '💰';
                  
                  return (
                    <li
                      key={expense._id || index}
                      className="flex justify-between items-center hover:bg-gray-50 rounded-lg p-2 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{icon}</span>
                        <div>
                          <p className="font-medium text-gray-800">{source}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-red-500 bg-red-100 rounded-lg px-2 font-medium flex items-center gap-1">
                          -${Math.abs(amount).toLocaleString()}{" "}
                          <ArrowDownRight size={14} />
                        </p>
                      </div>
                    </li>
                  );
                }) : (
                  <p className="text-gray-500 text-center py-4">No expenses yet</p>
                )}
              </ul>
            </div>

            <div className="flex-1 bg-white rounded-2xl p-5 shadow hover:shadow-md transition flex flex-col items-center justify-center">
              <h1 className="text-start font-semibold text-lg mb-4">Expenses by Category</h1>
              {expenses.length > 0 ? (
                <BarChart
                  style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                  data={expenses}
                  margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ExpenseSource" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`$${Math.abs(value).toLocaleString()}`, 'Amount']}
                    labelFormatter={(label) => `Category: ${label}`}
                  />
                  <Bar dataKey="ExpenseAmount" fill="#6B46C1" />
                </BarChart>
              ) : (
                <p className="text-gray-500">No expense data available</p>
              )}
            </div>
          </div>

          {/* Income */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white rounded-2xl p-5 shadow hover:shadow-md transition flex flex-col items-center justify-center">
              <h1 className="font-semibold text-lg mb-4">Income by Source</h1>
              {incomes.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={incomes}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="IncomeAmount"
                      nameKey="IncomeSource"
                    >
                      {incomes.map((income, i) => (
                        <Cell key={i} fill={pieChartData[i % pieChartData.length].color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500">No income data available</p>
              )}
            </div>

            <div className="flex-1 bg-white rounded-2xl p-5 shadow hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Recent Income</h3>
                <button onClick={() => setInternalActiveSection('Income')} className="text-sm cursor-pointer text-gray-600 hover:text-purple-600 flex items-center gap-1">
                  See All <ArrowUpRight size={16} />
                </button>
              </div>
              <ul className="space-y-4">
                {incomes.length > 0 ? incomes.slice(-5).map((income, index) => {
                  const amount = income.IncomeAmount || income.incomeAmount || 0;
                  const source = income.IncomeSource || income.incomeSource || 'N/A';
                  const icon = income.IncomeIcon || income.incomeIcon || '💵';
                  
                  return (
                    <li
                      key={income._id || index}
                      className="flex justify-between items-center hover:bg-gray-50 rounded-lg p-2 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{icon}</span>
                        <div>
                          <p className="font-medium text-gray-800">{source}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-green-600 bg-green-100 rounded-lg px-2 font-medium flex items-center gap-1">
                          +${Math.abs(amount).toLocaleString()} <ArrowUpRight size={14} />
                        </p>
                      </div>
                    </li>
                  );
                }) : (
                  <p className="text-gray-500 text-center py-4">No income yet</p>
                )}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;