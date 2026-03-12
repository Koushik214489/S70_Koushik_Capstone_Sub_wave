import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellIcon, ClockIcon, BellSlashIcon, ShieldCheckIcon, DocumentTextIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const NotificationItem = React.forwardRef(({ notification, onSnooze, onDisable, delay }, ref) => (
  <motion.div
    ref={ref}
    layout
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3, delay }}
    className="p-5 mb-4 bg-black/40 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group"
  >
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-white/10 shadow-inner">
            <BellIcon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
            {notification.title}
          </h3>
          <p className="mt-1 text-sm text-gray-400 max-w-md line-clamp-2">
            {notification.description}
          </p>
          <div className="flex items-center mt-2 text-xs font-medium px-2 py-1 bg-white/5 rounded-md w-fit">
            <ClockIcon className="w-3.5 h-3.5 mr-1 text-gray-400 group-hover:text-primary transition-colors" />
            <span className="text-gray-400 group-hover:text-primary transition-colors">{notification.time}</span>
          </div>
        </div>
      </div>
      <div className="flex sm:flex-col space-x-3 sm:space-x-0 sm:space-y-2 justify-end">
        <button
          onClick={() => onSnooze(notification.id)}
          className="px-4 py-2 border border-white/10 text-xs font-bold rounded-xl text-gray-300 bg-white/5 hover:bg-white/20 hover:text-white transition-all w-full text-center"
        >
          Snooze
        </button>
        <button
          onClick={() => onDisable(notification.id)}
          className="px-4 py-2 border border-red-500/30 text-xs font-bold rounded-xl text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:text-red-300 transition-all w-full text-center"
        >
          Dismiss
        </button>
      </div>
    </div>
  </motion.div>
));

const NotificationPreference = ({ label, description, checked, onChange, icon }) => (
  <div className="flex items-center justify-between pb-5 border-b border-white/5 mb-5 last:border-0 last:mb-0 last:pb-0 group hover:bg-white/[0.02] p-4 -mx-4 rounded-xl transition-all">
    <div className="flex items-center">
      <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center mr-4 group-hover:bg-white/10 transition-colors shadow-inner">
        {icon}
      </div>
      <div className="flex-1 pr-4">
        <label className="text-base font-bold text-gray-200 cursor-pointer">{label}</label>
        {description && <p className="text-sm text-gray-500 mt-1 line-clamp-1">{description}</p>}
      </div>
    </div>
    <div className="ml-auto">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <div className="w-14 h-7 bg-black/60 border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-secondary peer-checked:border-transparent drop-shadow-2xl"></div>
      </label>
    </div>
  </div>
);

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Netflix Renewal', description: 'Your Netflix Premium subscription will renew in 3 days for ₹1,499.', time: '2 hours ago' },
    { id: 2, title: 'Spotify Price Increase', description: 'Spotify has announced a price increase to ₹399/mo starting next billing cycle.', time: '1 day ago' },
  ]);

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    budgetAlerts: true,
    pushNotifications: false,
    paymentDueAlerts: true,
    priceChangeAlerts: true,
  });

  const handlePreferenceChange = (preference) => (event) => {
    setPreferences({
      ...preferences,
      [preference]: event.target.checked,
    });
  };

  const handleSnooze = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleDisable = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between"
      >
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-accent border border-white/10 flex items-center justify-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-accent/20 blur-xl"></div>
            <BellIcon className="w-8 h-8 text-white relative z-10" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Notifications</h1>
            <p className="text-gray-400">Manage alerts and communication preferences.</p>
          </div>
        </div>
        <div>
          <button
            onClick={() => setNotifications([])}
            disabled={notifications.length === 0}
            className={`px-5 py-2.5 font-bold rounded-xl transition-all shadow-lg border ${notifications.length > 0
              ? 'bg-white/10 text-white hover:bg-white/20 border-white/20'
              : 'bg-white/5 text-gray-500 border-white/5 cursor-not-allowed'
              }`}
          >
            Mark All as Read
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Alerts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden h-fit"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -z-10" />
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center">
              Inbox
            </h2>
            {notifications.length > 0 && (
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/30">
                {notifications.length} New
              </span>
            )}
          </div>

          <div className="space-y-1">
            <AnimatePresence mode="popLayout">
              {notifications.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-20 h-20 bg-black/40 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 blur-xl"></div>
                    <BellSlashIcon className="w-10 h-10 text-gray-500 relative z-10" />
                  </div>
                  <p className="text-white font-bold text-xl mb-2">You're all caught up!</p>
                  <p className="text-gray-400 text-sm max-w-xs">Once you have active tracking or limits set, notifications will appear here.</p>
                </motion.div>
              ) : (
                notifications.map((notification, index) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onSnooze={handleSnooze}
                    onDisable={handleDisable}
                    delay={index * 0.1}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden h-fit"
        >
          <div className="absolute top-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] -z-10" />
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
            Preferences
          </h2>
          <div className="flex flex-col">
            <NotificationPreference
              label="Email Notifications"
              description="Receive daily summaries to your inbox."
              checked={preferences.emailNotifications}
              onChange={handlePreferenceChange('emailNotifications')}
              icon={<DocumentTextIcon className="w-6 h-6 text-gray-400 group-hover:text-secondary transition-colors" />}
            />
            <NotificationPreference
              label="Push Notifications"
              description="Get instant alerts directly in browser."
              checked={preferences.pushNotifications}
              onChange={handlePreferenceChange('pushNotifications')}
              icon={<BellIcon className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />}
            />
            <NotificationPreference
              label="Payment Due Alerts"
              description="Warn me 3 days before renews."
              checked={preferences.paymentDueAlerts}
              onChange={handlePreferenceChange('paymentDueAlerts')}
              icon={<ClockIcon className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors" />}
            />
            <NotificationPreference
              label="Budget Limit Alerts"
              description="Notify me on exceeding budgets."
              checked={preferences.budgetAlerts}
              onChange={handlePreferenceChange('budgetAlerts')}
              icon={<ShieldCheckIcon className="w-6 h-6 text-gray-400 group-hover:text-orange-400 transition-colors" />}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications; 