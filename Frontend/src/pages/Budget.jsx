import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CreditCardIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { subscriptions as subscriptionsApi } from '../services/api';
import { Link } from 'react-router-dom';

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
        <p className="text-3xl font-extrabold text-white">₹{data.totalBudget.toFixed(2)}</p>
        <p className="text-sm text-primary mt-2 font-medium">
          Monthly defined limit
        </p>
      </div>

      <div className="p-6 bg-black/40 border border-white/10 rounded-2xl group hover:bg-white/5 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center border border-secondary/30">
            <ArrowTrendingUpIcon className="h-5 w-5 text-secondary" />
          </div>
          <span className="text-sm font-medium text-gray-400">Expenses</span>
        </div>
        <p className="text-3xl font-extrabold text-white">₹{data.expenses.toFixed(2)}</p>
        <div className="w-full bg-white/10 rounded-full h-1.5 mt-4 overflow-hidden">
          <div
            className={`h-1.5 rounded-full ${data.expenses > data.totalBudget && data.totalBudget > 0 ? 'bg-red-500' : 'bg-gradient-to-r from-secondary to-accent'}`}
            style={{ width: `${data.totalBudget > 0 ? Math.min(100, (data.expenses / data.totalBudget) * 100) : 0}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {data.totalBudget > 0 ? ((data.expenses / data.totalBudget) * 100).toFixed(1) : '0.0'}% of total budget
        </p>
      </div>

      <div className="p-6 bg-black/40 border border-white/10 rounded-2xl group hover:bg-white/5 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center border border-pink-500/30">
            <ClockIcon className="h-5 w-5 text-accent" />
          </div>
          <span className="text-sm font-medium text-gray-400">Remaining</span>
        </div>
        <p className={`text-3xl font-extrabold ${data.totalBudget - data.expenses < 0 ? 'text-red-400' : 'text-white'}`}>
          ₹{Math.max(0, data.totalBudget - data.expenses).toFixed(2)}
        </p>
        <p className="text-sm text-accent mt-2 font-medium">Available to spend</p>
      </div>
    </div>
  </motion.div>
);

const SpendingByCategory = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden h-full flex flex-col items-center justify-center text-center mt-0 min-h-[300px]"
      >
        <div className="w-16 h-16 bg-black/40 rounded-full flex items-center justify-center border border-white/10 shadow-inner mb-4">
          <ClockIcon className="w-8 h-8 text-gray-500" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">No Categories Yet</h2>
        <p className="text-sm text-gray-400 max-w-xs">Add subscriptions with categories to see your spending breakdown here.</p>
        <Link to="/add-subscription" className="mt-4 text-primary hover:text-cyan-300 transition-colors text-sm font-bold">
          + Add Subscription
        </Link>
      </motion.div>
    );
  }

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
            ₹{categories.reduce((a, b) => a + b.amount, 0).toFixed(0)}
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
    <h2 className="text-xl font-bold text-white mb-6">Active Subscriptions</h2>
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
                <div className="text-xl">{transaction.service?.[0] || '🔄'}</div>
              )}
            </div>
            <div className="ml-4">
              <div className="text-sm font-bold text-gray-200 group-hover:text-primary transition-colors">
                {transaction.service}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {transaction.date ? `Renews: ${transaction.date}` : transaction.category}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-white">
              ₹{transaction.amount.toFixed(2)}
            </div>
            <div className="mt-1">
              <span
                className={`px-2.5 py-0.5 inline-flex text-[10px] leading-4 font-bold rounded-full ${transaction.status === 'Active'
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
        <div className="text-center py-12 text-gray-500 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10 shadow-inner">
            <CreditCardIcon className="w-8 h-8 text-white/30" />
          </div>
          <p className="font-semibold text-gray-300 text-lg">No active tracking yet!</p>
          <p className="text-sm text-gray-500 mt-1 mb-4">You haven't added any subscriptions to track.</p>
          <Link to="/add-subscription" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-xl transition-all border border-white/10">
            Get Started
          </Link>
        </div>
      )}
    </div>
  </motion.div>
);

const Budget = () => {
  const [budgetData, setBudgetData] = useState({
    totalBudget: 0,
    expenses: 0,
    daysLeft: 30,
  });

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Budget Edit State
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [tempBudgetLimit, setTempBudgetLimit] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Retrieve budget limit from localStorage (default to 0)
      const storedBudget = parseFloat(localStorage.getItem('userBudgetLimit')) || 0;

      const response = await subscriptionsApi.getAll();
      const subs = response.data || [];

      // Calculate Total Expenses
      const totalExpenses = subs.reduce((acc, sub) => acc + (sub.amount || 0), 0);

      // We process subscriptions to acts as active transactions
      const mappedTransactions = subs.map(sub => ({
        id: sub._id || Math.random().toString(),
        service: sub.name,
        amount: sub.amount || 0,
        date: sub.nextRenewal ? new Date(sub.nextRenewal).toLocaleDateString() : '',
        status: 'Active',
        icon: sub.icon || '',
        category: sub.category || 'Other'
      }));

      // Calculate Categories
      const catMap = {};
      subs.forEach(sub => {
        const catName = sub.category || 'Other';
        if (!catMap[catName]) catMap[catName] = 0;
        catMap[catName] += (sub.amount || 0);
      });

      const mappedCategories = Object.keys(catMap).map(key => ({
        name: key,
        amount: catMap[key]
      })).filter(cat => cat.amount > 0);

      setBudgetData({
        totalBudget: storedBudget,
        expenses: totalExpenses,
        daysLeft: 30 // hardcoded for display purposes
      });

      setTransactions(mappedTransactions);
      setCategories(mappedCategories);

    } catch (error) {
      console.error("Failed to load budget data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBudgetClick = () => {
    setTempBudgetLimit(budgetData.totalBudget > 0 ? budgetData.totalBudget.toString() : '');
    setIsEditingBudget(true);
  };

  const handleSaveBudget = () => {
    const newBudget = parseFloat(tempBudgetLimit);
    if (!isNaN(newBudget) && newBudget >= 0) {
      localStorage.setItem('userBudgetLimit', newBudget);
      setBudgetData(prev => ({ ...prev, totalBudget: newBudget }));
    }
    setIsEditingBudget(false);
  };

  const handleCancelEdit = () => {
    setIsEditingBudget(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

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
        <div className="mt-4 md:mt-0 relative h-10 flex items-center justify-end min-w-[200px]">
          <AnimatePresence mode="wait">
            {isEditingBudget ? (
              <motion.div
                key="edit-mode"
                initial={{ opacity: 0, scale: 0.95, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95, x: 20 }}
                className="flex items-center space-x-2 bg-[#0a0a16] border border-white/20 p-2 rounded-xl shadow-2xl absolute right-0 z-20 top-0"
              >
                <div className="relative flex items-center px-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-gray-400 mr-1 font-bold">₹</span>
                  <input
                    type="number"
                    value={tempBudgetLimit}
                    onChange={(e) => setTempBudgetLimit(e.target.value)}
                    className="bg-transparent text-white font-bold w-24 py-1.5 focus:outline-none placeholder-gray-600"
                    placeholder="0.00"
                    min="0"
                  />
                </div>
                <button onClick={handleSaveBudget} className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                  <CheckIcon className="w-5 h-5" />
                </button>
                <button onClick={handleCancelEdit} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </motion.div>
            ) : (
              <motion.div key="button-mode" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="absolute right-0 top-0">
                <button
                  onClick={handleEditBudgetClick}
                  className="px-5 py-2 hover:bg-white/20 bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-all hover:scale-105 shadow-lg flex items-center h-11"
                >
                  <BanknotesIcon className="w-5 h-5 mr-2 text-emerald-400" />
                  Edit Budget Limit
                </button>
              </motion.div>
            )}
          </AnimatePresence>
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