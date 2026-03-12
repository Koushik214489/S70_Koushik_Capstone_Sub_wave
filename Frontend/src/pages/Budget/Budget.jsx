import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetOverview = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
    <h2 className="text-xl font-bold text-white mb-6">Budget Overview</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 bg-black/40 border border-white/10 rounded-2xl group hover:bg-white/5 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
            <BanknotesIcon className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm font-medium text-gray-400">Total Budget</span>
        </div>
        <p className="text-3xl font-extrabold text-white">${data.totalBudget.toFixed(2)}</p>
        <p className="text-sm text-primary mt-2 font-medium">
          {data.daysLeft} days left in cycle
        </p>
      </div>

      <div className="p-6 bg-black/40 border border-white/10 rounded-2xl group hover:bg-white/5 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center border border-secondary/30">
            <ArrowTrendingUpIcon className="h-5 w-5 text-secondary" />
          </div>
          <span className="text-sm font-medium text-gray-400">Expenses</span>
        </div>
        <p className="text-3xl font-extrabold text-white">${data.expenses.toFixed(2)}</p>
        <div className="w-full bg-white/10 rounded-full h-1.5 mt-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-secondary to-accent h-1.5 rounded-full"
            style={{ width: `${Math.min(100, (data.expenses / data.totalBudget) * 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {((data.expenses / data.totalBudget) * 100).toFixed(1)}% of total budget
        </p>
      </div>

      <div className="p-6 bg-black/40 border border-white/10 rounded-2xl group hover:bg-white/5 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center border border-pink-500/30">
            <ClockIcon className="h-5 w-5 text-accent" />
          </div>
          <span className="text-sm font-medium text-gray-400">Remaining</span>
        </div>
        <p className="text-3xl font-extrabold text-white">
          ${(data.totalBudget - data.expenses).toFixed(2)}
        </p>
        <p className="text-sm text-accent mt-2 font-medium">Available to spend</p>
      </div>
    </div>
  </motion.div>
);

const SpendingByCategory = ({ categories }) => {
  const data = {
    labels: categories.map((cat) => cat.name),
    datasets: [
      {
        data: categories.map((cat) => cat.amount),
        backgroundColor: [
          'rgba(6, 182, 212, 0.8)',   // cyan-500
          'rgba(168, 85, 247, 0.8)',  // purple-500
          'rgba(236, 72, 153, 0.8)',  // pink-500
          'rgba(59, 130, 246, 0.8)',  // blue-500
          'rgba(249, 115, 22, 0.8)',  // orange-500
        ],
        borderColor: [
          'rgba(6, 182, 212, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(249, 115, 22, 1)',
        ],
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: "'Inter', sans-serif"
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12
      }
    },
    cutout: '75%',
    maintainAspectRatio: false,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden h-full flex flex-col"
    >
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] -z-10" />
      <h2 className="text-xl font-bold text-white mb-6">Spending by Category</h2>
      <div className="flex-1 min-h-[300px] flex items-center justify-center relative">
        <Doughnut data={data} options={options} />
        {/* Inner Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-sm text-gray-500 font-medium">Total</span>
          <span className="text-2xl font-bold text-white">
            ${categories.reduce((a, b) => a + b.amount, 0).toFixed(0)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const RecentTransactions = ({ transactions }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden h-full"
  >
    <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -z-10" />
    <h2 className="text-xl font-bold text-white mb-6">Recent Transactions</h2>
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden shadow-inner p-1">
              {transaction.icon && transaction.icon !== '' ? (
                <img
                  className="h-full w-full object-contain rounded-lg"
                  src={transaction.icon}
                  alt={transaction.service}
                />
              ) : (
                <CreditCardIcon className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <div className="ml-4">
              <div className="text-sm font-bold text-gray-200 group-hover:text-primary transition-colors">
                {transaction.service}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {transaction.date}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-white">
              ${transaction.amount.toFixed(2)}
            </div>
            <div className="mt-1">
              <span
                className={`px-2.5 py-0.5 inline-flex text-[10px] leading-4 font-bold rounded-full ${transaction.status === 'Completed'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  }`}
              >
                {transaction.status}
              </span>
            </div>
          </div>
        </div>
      ))}
      {transactions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No recent transactions!
        </div>
      )}
    </div>
  </motion.div>
);

const Budget = () => {
  const [budgetData, setBudgetData] = useState({
    totalBudget: 2840.0,
    expenses: 1860.0,
    daysLeft: 12,
  });

  const [transactions, setTransactions] = useState([
    { id: 1, service: 'Netflix Premium', amount: 19.99, date: 'Mar 01, 2026', status: 'Completed', icon: '' },
    { id: 2, service: 'Adobe Creative Cloud', amount: 54.99, date: 'Feb 28, 2026', status: 'Completed', icon: '' },
    { id: 3, service: 'Spotify Duo', amount: 14.99, date: 'Feb 26, 2026', status: 'Completed', icon: '' },
    { id: 4, service: 'AWS Hosting', amount: 124.50, date: 'Feb 25, 2026', status: 'Pending', icon: '' },
  ]);

  const [categories, setCategories] = useState([
    { name: 'Entertainment', amount: 450 },
    { name: 'Productivity', amount: 380 },
    { name: 'Utilities', amount: 280 },
    { name: 'Other', amount: 750 },
  ]);

  useEffect(() => {
    // TODO: Fetch budget data from backend
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between"
      >
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 border border-white/10 flex items-center justify-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-emerald-500/20 blur-xl"></div>
            <BanknotesIcon className="w-8 h-8 text-white relative z-10" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Budget & Spending</h1>
            <p className="text-gray-400">Track and manage your monthly expenses.</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="px-5 py-2.5 bg-white/10 border border-white/10 text-white rounded-xl hover:bg-white/20 font-medium transition-all hover:scale-105 shadow-lg">
            Edit Budget Limit
          </button>
        </div>
      </motion.div>

      <BudgetOverview data={budgetData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-full">
          <SpendingByCategory categories={categories} />
        </div>
        <div className="h-full">
          <RecentTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Budget; 