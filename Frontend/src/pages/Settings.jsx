import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../store/slices/uiSlice';

const TabButton = ({ active, icon: Icon, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${active
      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white border border-white/10 shadow-[inset_0px_0px_20px_rgba(255,255,255,0.05)]'
      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
      }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-gray-500'}`} />
    <span className="font-medium">{label}</span>
  </button>
);

const InputField = ({ label, type = "text", value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="relative w-full px-4 py-3 bg-[#0a0a16] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all"
      />
    </div>
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-accent rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
      <select
        value={value}
        onChange={onChange}
        className="relative w-full px-4 py-3 bg-[#0a0a16] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all appearance-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
    </div>
  </div>
);

const Settings = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(state => state.ui.theme);

  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({
    name: 'Koushik Reddy K M',
    email: 'koushikreddykm@gmail.com',
    phone: '+1 (555) 123-4567',
    currency: 'INR',
    language: 'English',
    theme: currentTheme,
  });

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setUser({ ...user, [field]: value });
    if (field === 'theme') {
      dispatch(setTheme(value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-4 mb-4"
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/20 blur-xl"></div>
          <Cog6ToothIcon className="w-8 h-8 text-white relative z-10" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Settings</h1>
          <p className="text-gray-400">Manage your account preferences and configurations.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-3 space-y-2 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-xl h-fit sticky top-8"
        >
          <TabButton active={activeTab === 'profile'} icon={UserCircleIcon} label="Profile" onClick={() => setActiveTab('profile')} />
          <TabButton active={activeTab === 'preferences'} icon={PaintBrushIcon} label="Preferences" onClick={() => setActiveTab('preferences')} />
          <TabButton active={activeTab === 'security'} icon={ShieldCheckIcon} label="Security" onClick={() => setActiveTab('security')} />
          <TabButton active={activeTab === 'billing'} icon={CreditCardIcon} label="Billing" onClick={() => setActiveTab('billing')} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-9"
        >
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 relative overflow-hidden min-h-[500px]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.form
                  key="profile"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  className="space-y-8 relative z-10"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Public Profile</h2>
                    <p className="text-gray-400 text-sm">This information will be displayed publicly.</p>
                  </div>

                  <div className="flex items-center space-x-6 border-b border-white/10 pb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                      <div className="w-full h-full bg-[#050511] rounded-full flex items-center justify-center overflow-hidden">
                        <UserCircleIcon className="w-16 h-16 text-gray-500" />
                      </div>
                    </div>
                    <div>
                      <button type="button" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors border border-white/10 text-sm font-medium shadow-lg">
                        Change Avatar
                      </button>
                      <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Full Name" value={user.name} onChange={handleInputChange('name')} />
                    <InputField label="Email Address" type="email" value={user.email} onChange={handleInputChange('email')} />
                    <div className="md:col-span-2">
                      <InputField label="Phone Number" type="tel" value={user.phone} onChange={handleInputChange('phone')} />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex justify-end">
                    <button type="submit" className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 hover:scale-105">
                      Save Changes
                    </button>
                  </div>
                </motion.form>
              )}

              {activeTab === 'preferences' && (
                <motion.form
                  key="preferences"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  className="space-y-8 relative z-10"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">App Preferences</h2>
                    <p className="text-gray-400 text-sm">Customize how SubWave looks and feels.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
                    <SelectField
                      label="Primary Currency"
                      value={user.currency}
                      onChange={handleInputChange('currency')}
                      options={[
                        { value: 'USD', label: 'USD ($)' }, { value: 'EUR', label: 'EUR (€)' }, { value: 'GBP', label: 'GBP (£)' }, { value: 'INR', label: 'INR (₹)' }
                      ]}
                    />
                    <SelectField
                      label="Display Language"
                      value={user.language}
                      onChange={handleInputChange('language')}
                      options={[
                        { value: 'English', label: 'English (US)' }, { value: 'Spanish', label: 'Español' }, { value: 'French', label: 'Français' }
                      ]}
                    />
                    <SelectField
                      label="Color Theme"
                      value={user.theme}
                      onChange={handleInputChange('theme')}
                      options={[
                        { value: 'theme-plum', label: 'Plum & Graphite (Purple)' },
                        { value: 'theme-emerald', label: 'Emerald Night (Teal)' },
                        { value: 'theme-amber', label: 'Midnight Amber (Gold)' },
                        { value: 'theme-coral', label: 'Coral Dawn (Orange/Pink)' }
                      ]}
                    />
                  </div>

                  <div className="pt-6 border-t border-white/10 flex justify-end">
                    <button type="submit" className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 hover:scale-105">
                      Update Preferences
                    </button>
                  </div>
                </motion.form>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                  className="space-y-8 relative z-10"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Security & Access</h2>
                    <p className="text-gray-400 text-sm">Manage your password and security settings.</p>
                  </div>

                  <div className="space-y-6 max-w-lg">
                    <InputField label="Current Password" type="password" placeholder="••••••••" />
                    <InputField label="New Password" type="password" placeholder="••••••••" />
                    <InputField label="Confirm New Password" type="password" placeholder="••••••••" />

                    <button type="button" className="px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all border border-white/20 shadow-lg mt-4">
                      Update Password
                    </button>
                  </div>

                  <div className="pt-8 border-t border-white/10 mt-8">
                    <h3 className="text-lg font-bold text-red-500 mb-2">Danger Zone</h3>
                    <p className="text-gray-400 text-sm mb-4">Permanently delete your account and all data.</p>
                    <button type="button" className="px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/20 font-medium rounded-xl hover:bg-red-500/20 transition-all">
                      Delete Account
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'billing' && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                  className="space-y-8 relative z-10"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Billing & Subscription</h2>
                    <p className="text-gray-400 text-sm">Manage your SubWave Pro plan.</p>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-background to-card border border-secondary/30 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider bg-secondary/20 text-secondary rounded-md border border-secondary/30">Current Plan</span>
                      <h3 className="text-xl font-bold text-white mt-2">SubWave Free</h3>
                      <p className="text-gray-400 text-sm mt-1">Basic features, up to 10 subscriptions.</p>
                    </div>
                    <button type="button" className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all">
                      Upgrade to Pro
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings; 