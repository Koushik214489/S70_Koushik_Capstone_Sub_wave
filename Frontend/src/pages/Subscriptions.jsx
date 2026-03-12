import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { subscriptions } from '../services/api';
import { MagnifyingGlassIcon, PlusIcon, PencilSquareIcon, TrashIcon, CreditCardIcon } from '@heroicons/react/24/outline';

const Subscriptions = () => {
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await subscriptions.getAll();
      setSubscriptionsData(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      setError('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        await subscriptions.delete(id);
        fetchSubscriptions();
      } catch (error) {
        console.error('Error deleting subscription:', error);
      }
    }
  };

  const filteredAndSortedSubscriptions = subscriptionsData
    .filter(sub => {
      if (filter === 'all') return true;
      if (filter === 'upcoming') {
        if (!sub.nextRenewal) return false;
        const renewalDate = new Date(sub.nextRenewal);
        const today = new Date();
        const daysUntilRenewal = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));
        return daysUntilRenewal <= 7 && daysUntilRenewal >= 0;
      }
      return sub.category && sub.category.toLowerCase() === filter.toLowerCase();
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'amount':
          return (b.amount || 0) - (a.amount || 0);
        case 'renewal':
          return new Date(a.nextRenewal) - new Date(b.nextRenewal);
        default:
          return 0;
      }
    });

  const totalSpending = subscriptionsData.reduce((acc, sub) => acc + (sub.amount || 0), 0);
  const upcomingRenewals = subscriptionsData.filter(sub => {
    if (!sub.nextRenewal) return false;
    const renewalDate = new Date(sub.nextRenewal);
    const today = new Date();
    const daysUntilRenewal = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilRenewal <= 7 && daysUntilRenewal >= 0;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-xl text-center backdrop-blur-sm">
          {error}
        </div>
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
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary border border-white/10 flex items-center justify-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-secondary/20 blur-xl"></div>
            <CreditCardIcon className="w-8 h-8 text-white relative z-10" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Subscriptions</h1>
            <p className="text-gray-400">Manage all your digital subscriptions in one place.</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/add-subscription"
            className="px-5 py-2.5 flex items-center bg-white/10 border border-white/10 text-white rounded-xl hover:bg-white/20 font-medium transition-all hover:scale-105 shadow-lg"
          >
            <PlusIcon className="w-5 h-5 mr-2 text-primary" /> Add Subscription
          </Link>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-sm font-medium text-gray-400 mb-1 relative z-10">Total Subscriptions</h3>
          <p className="text-3xl font-extrabold text-white relative z-10">{subscriptionsData.length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-sm font-medium text-gray-400 mb-1 relative z-10">Monthly Spending</h3>
          <p className="text-3xl font-extrabold text-white relative z-10">₹{totalSpending.toFixed(2)}</p>
        </div>
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-sm font-medium text-gray-400 mb-1 relative z-10">Upcoming Renewals</h3>
          <p className="text-3xl font-extrabold text-white relative z-10">{upcomingRenewals.length}</p>
        </div>
      </motion.div>

      {/* Filters and Sort */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-black/40 border border-white/10 backdrop-blur-xl rounded-2xl p-5"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
              >
                <option value="all">Filters: All Subscriptions</option>
                <option value="upcoming">Filters: Upcoming Renewals</option>
                <option value="entertainment">Filters: Entertainment</option>
                <option value="productivity">Filters: Productivity</option>
                <option value="education">Filters: Education</option>
                <option value="health">Filters: Health & Fitness</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <span className="text-sm font-medium text-gray-400 shrink-0">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full min-w-[140px] px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
            >
              <option value="name">Name (A-Z)</option>
              <option value="amount">Amount (High to Low)</option>
              <option value="renewal">Renewal Date (Soonest)</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Subscriptions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl relative"
      >
        {filteredAndSortedSubscriptions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 mx-auto bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6">
              <CreditCardIcon className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No subscriptions found</h3>
            <p className="text-gray-400 mb-6 max-w-sm mx-auto">
              {filter === 'all'
                ? "You haven't added any subscriptions yet. Start organizing your recurring payments now!"
                : "No subscriptions match your current filter criteria."
              }
            </p>
            {filter === 'all' && (
              <Link
                to="/add-subscription"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:scale-105"
              >
                Add Your First Subscription
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            <AnimatePresence>
              {filteredAndSortedSubscriptions.map((subscription) => {
                const renewalDate = subscription.nextRenewal ? new Date(subscription.nextRenewal) : null;
                const today = new Date();
                const daysUntilRenewal = renewalDate ? Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24)) : null;
                const isUpcoming = daysUntilRenewal !== null && daysUntilRenewal <= 7 && daysUntilRenewal >= 0;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={subscription._id || subscription.name}
                    className="p-6 hover:bg-white/[0.03] transition-colors group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-5">
                        <div className="w-14 h-14 bg-black/40 border border-white/10 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform">
                          {subscription.icon && subscription.icon.length > 2 ? (
                            <img src={subscription.icon} alt={subscription.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-2xl">{subscription.icon || '✨'}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">{subscription.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-medium px-2 py-0.5 bg-white/10 text-gray-300 rounded-md">
                              {subscription.category || 'Subscription'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {subscription.billingCycle} • {subscription.paymentMethod || 'Card'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end space-x-6 sm:w-auto w-full">
                        <div className="text-left sm:text-right">
                          <p className="text-xl font-extrabold text-white">
                            ₹{subscription.amount ? subscription.amount.toFixed(2) : '0.00'}
                            <span className="text-sm text-gray-500 font-medium font-normal">/mo</span>
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {renewalDate ? `Renews ${renewalDate.toLocaleDateString()}` : 'No renewal set'}
                            {isUpcoming && (
                              <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                                {daysUntilRenewal}d left
                              </span>
                            )}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {/* TODO: Edit subscription */ }}
                            className="p-2 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors bg-black/40"
                            title="Edit"
                          >
                            <PencilSquareIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(subscription._id)}
                            className="p-2 border border-red-500/30 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors bg-red-500/10"
                            title="Delete"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Subscriptions; 