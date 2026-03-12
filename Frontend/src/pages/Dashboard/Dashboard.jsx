import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const SubscriptionOverview = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-8"
  >
    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
      <ChartBarIcon className="w-6 h-6 mr-2 text-primary" />
      Overview
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: 'Active Services', value: '21', subtext: 'subscriptions', icon: <ChartBarIcon className="w-5 h-5 text-primary" /> },
        { label: 'Monthly Spend', value: '$247.00', subtext: 'total recurring', icon: <ArrowTrendingUpIcon className="w-5 h-5 text-secondary" /> },
        { label: 'Next Renewal', value: '3 days', subtext: 'Netflix - $15.99', icon: <CalendarIcon className="w-5 h-5 text-accent" /> }
      ].map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02, translateY: -5 }}
          className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all shadow-xl group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-sm font-medium text-gray-400">{item.label}</span>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
              {item.icon}
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white mb-1 relative z-10 tracking-tight">{item.value}</p>
          {item.subtext && (
            <p className="text-sm text-gray-500 relative z-10">{item.subtext}</p>
          )}
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const UpcomingRenewals = () => {
  const renewals = [
    {
      id: 1,
      name: 'Netflix',
      date: 'Feb 28, 2024',
      amount: 19.99,
      color: 'bg-red-500'
    },
    {
      id: 2,
      name: 'Spotify',
      date: 'Mar 15, 2024',
      amount: 14.99,
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Adobe Creative Cloud',
      date: 'Mar 20, 2024',
      amount: 54.99,
      color: 'bg-red-600'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-white flex items-center">
          <CalendarIcon className="w-6 h-6 mr-2 text-secondary" />
          Upcoming Renewals
        </h2>
        <button className="text-sm font-medium text-primary hover:text-cyan-300 transition-colors">View All</button>
      </div>

      <div className="space-y-4">
        {renewals.map((renewal, index) => (
          <motion.div
            key={renewal.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
            className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 transition-all group cursor-pointer"
          >
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-lg ${renewal.color} bg-opacity-80 backdrop-blur-sm group-hover:scale-110 transition-transform`}>
                {renewal.name[0]}
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-200 group-hover:text-white transition-colors">{renewal.name}</h3>
                <p className="text-sm text-gray-400">Renews on {renewal.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-white tracking-tight">${renewal.amount}</p>
              <p className="text-xs text-red-400 mt-1 font-medium bg-red-400/10 px-2 py-0.5 rounded-full inline-block">Due Soon</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-col md:flex-row md:items-end justify-between"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight mb-2">
            Welcome back, User!
          </h1>
          <p className="text-gray-400 text-lg">Here's a summary of your digital subscriptions.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="px-5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 font-medium transition-colors backdrop-blur-sm">
            Analytics Report
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] font-medium transition-all hover:scale-105 shadow-lg">
            + Add New
          </button>
        </div>
      </motion.div>

      <SubscriptionOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <UpcomingRenewals />

        {/* Placeholder for an Analytics Chart component in the future */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden hidden lg:flex flex-col items-center justify-center text-center group"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
          <ChartBarIcon className="w-16 h-16 text-gray-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-300 mb-2">Spending Trends</h3>
          <p className="text-gray-500 max-w-xs">Detailed analytics and monthly spending charts map will appear here.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 