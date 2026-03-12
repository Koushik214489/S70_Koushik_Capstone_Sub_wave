import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  CreditCardIcon,
  ChartBarIcon,
  BellIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { name: 'Subscriptions', path: '/subscriptions', icon: CreditCardIcon },
  { name: 'Budget', path: '/budget', icon: ChartBarIcon },
  { name: 'Notifications', path: '/notifications', icon: BellIcon },
  { name: 'Settings', path: '/settings', icon: Cog6ToothIcon },
  { name: 'Help & support', path: '/help', icon: QuestionMarkCircleIcon },
];

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[#050511] font-sans selection:bg-secondary selection:text-white relative overflow-hidden">
      {/* Background Orbs to match Landing & Auth */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none z-0" />

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
        className="fixed inset-y-0 left-0 w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 z-20"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <motion.div
            className="h-20 flex items-center px-6 border-b border-white/10"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl leading-none">S</span>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              SubWave
            </h1>
          </motion.div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${isActive
                        ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 text-white shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                      }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* User Profile Hook (Mock for layout) */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center px-4 py-3 bg-white/5 rounded-xl border border-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-sm font-bold text-white mr-3">
                U
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">User Account</p>
                <p className="text-xs text-gray-500 truncate">Settings</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-64 relative z-10 min-h-screen">
        <main className="flex-1 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout; 