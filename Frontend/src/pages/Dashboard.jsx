import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { subscriptions } from '../services/api';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  EnvelopeIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const [totalSpending, setTotalSpending] = useState(0);
  const [upcomingRenewals, setUpcomingRenewals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSyncingEmail, setIsSyncingEmail] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await subscriptions.getAll();
      setSubscriptionsData(response.data);

      const total = response.data.reduce((acc, sub) => acc + (sub.amount || 0), 0);
      setTotalSpending(total);

      const upcoming = response.data
        .filter(sub => {
          if (!sub.nextRenewal) return false;
          const renewalDate = new Date(sub.nextRenewal);
          const today = new Date();
          const daysUntilRenewal = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));
          return daysUntilRenewal <= 7 && daysUntilRenewal >= 0;
        })
        .sort((a, b) => new Date(a.nextRenewal) - new Date(b.nextRenewal));

      setUpcomingRenewals(upcoming);
    } catch (error) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const syncEmails = () => {
    setIsSyncingEmail(true);
    // Simulate a fake delay for the user
    setTimeout(() => {
      setIsSyncingEmail(false);
      alert("Gmail synchronization complete! (Simulated)");
    }, 2500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-secondary/20 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between"
      >
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-blue-600 border border-white/10 flex items-center justify-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 blur-xl"></div>
            <ChartBarIcon className="w-8 h-8 text-white relative z-10" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Dashboard Overview</h1>
            <p className="text-gray-400">Welcome back! Here's what's happening today.</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={syncEmails}
            className="px-5 py-2.5 flex items-center bg-white/10 border border-white/10 text-white rounded-xl hover:bg-white/20 font-medium transition-all hover:scale-105 shadow-lg"
          >
            {isSyncingEmail ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
            ) : (
              <EnvelopeIcon className="w-5 h-5 mr-2 text-primary" />
            )}
            Sync Web/Email
          </button>
          <Link
            to="/add-subscription"
            className="px-5 py-2.5 flex items-center bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] font-medium transition-all hover:scale-105 shadow-lg"
          >
            + Add New
          </Link>
        </div>
      </motion.div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-xl text-center backdrop-blur-sm">
          {error}
        </div>
      )}

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all shadow-xl group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-sm font-medium text-gray-400">Total Subscriptions</span>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
              <ChartBarIcon className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white mb-1 relative z-10 tracking-tight">{subscriptionsData.length}</p>
        </div>

        <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all shadow-xl group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-sm font-medium text-gray-400">Monthly Spending</span>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
              <ArrowTrendingUpIcon className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white mb-1 relative z-10 tracking-tight">
            ₹{isNaN(totalSpending) ? '0.00' : totalSpending.toFixed(2)}
          </p>
        </div>

        <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all shadow-xl group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-sm font-medium text-gray-400">Next Renewal</span>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
              <CalendarIcon className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-xl font-extrabold text-white mb-1 relative z-10 tracking-tight truncate">
            {upcomingRenewals.length > 0 && upcomingRenewals[0].nextRenewal
              ? new Date(upcomingRenewals[0].nextRenewal).toLocaleDateString()
              : 'None upcoming'
            }
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Subscriptions List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <CreditCardIcon className="w-6 h-6 mr-2 text-primary" /> Active Subscriptions
            </h2>
            <Link to="/subscriptions" className="text-sm text-primary hover:text-cyan-300 transition-colors">View All</Link>
          </div>

          <div className="space-y-4">
            {subscriptionsData.slice(0, 5).map((sub, i) => (
              <div key={sub._id || i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 transition-all hover:bg-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl shadow-inner">
                    {sub.icon || sub.name[0] || '🔄'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-200">{sub.name}</h3>
                    <p className="text-xs text-gray-400">{sub.category || 'Subscription'}</p>
                  </div>
                </div>
                <p className="font-bold text-white">₹{sub.amount ? sub.amount.toFixed(2) : '0.00'}/mo</p>
              </div>
            ))}
            {subscriptionsData.length === 0 && (
              <div className="text-center py-12 text-gray-500 flex flex-col items-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                  <CreditCardIcon className="w-8 h-8 text-white/30" />
                </div>
                <p className="font-semibold text-gray-300">No active tracking yet!</p>
                <p className="text-sm text-gray-500 mt-1 mb-4">You haven't added any subscriptions to track.</p>
                <Link to="/add-subscription" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-xl transition-all border border-white/10">
                  Add Subscription
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Upcoming Renewals List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] -z-10" />
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <CalendarIcon className="w-6 h-6 mr-2 text-secondary" /> Upcoming Renewals (7 Days)
            </h2>
          </div>

          <div className="space-y-4">
            {upcomingRenewals.map((sub, i) => (
              <div key={sub._id || i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 transition-all group hover:bg-white/10">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-lg bg-red-500/80 backdrop-blur-sm group-hover:scale-110 transition-transform">
                    {sub.icon || sub.name[0] || '!'}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-200">{sub.name}</h3>
                    <p className="text-xs text-gray-400">Renews {new Date(sub.nextRenewal).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">₹{sub.amount ? sub.amount.toFixed(2) : '0.00'}</p>
                  <p className="text-[10px] text-red-400 mt-1 font-medium bg-red-400/10 px-2 py-0.5 rounded-full inline-block">Due Soon</p>
                </div>
              </div>
            ))}
            {upcomingRenewals.length === 0 && (
              <div className="text-center py-12 text-gray-500 flex flex-col items-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                  <CalendarIcon className="w-8 h-8 text-white/30" />
                </div>
                <p className="font-semibold text-gray-300">All clear!</p>
                <p className="text-sm text-gray-500 mt-1">No upcoming renewals in the next 7 days.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
