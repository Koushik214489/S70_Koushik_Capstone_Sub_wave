import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { subscriptions } from '../services/api';
import { PlusCircleIcon, DocumentTextIcon, CalendarIcon, CreditCardIcon, CurrencyDollarIcon, TagIcon } from '@heroicons/react/24/outline';

const AddSubscription = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Entertainment',
    amount: '',
    billingCycle: 'Monthly',
    nextRenewal: '',
    notes: '',
    paymentMethod: 'Credit card',
    isCustom: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Entertainment', 'Productivity', 'Health & Fitness', 'Education', 'Shopping', 'Music', 'Gaming', 'Other'
  ];
  const billingCycles = ['Monthly', 'Yearly', 'Weekly', 'Custom'];
  const paymentMethods = ['Credit card', 'Debit card', 'PayPal', 'Bank transfer', 'Apple Pay', 'Google Pay'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await subscriptions.add(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding subscription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-4 mb-4"
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary border border-white/10 flex items-center justify-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-secondary/20 blur-xl"></div>
          <PlusCircleIcon className="w-8 h-8 text-white relative z-10" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Add Subscription</h1>
          <p className="text-gray-400">Track a new recurring service or payment.</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <DocumentTextIcon className="w-4 h-4 mr-2 text-primary" /> Subscription Name
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Netflix Premium"
                    className="relative w-full px-4 py-3 bg-[#0a0a16] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <CurrencyDollarIcon className="w-4 h-4 mr-2 text-green-400" /> Amount
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative flex items-center bg-[#0a0a16] border border-white/10 rounded-xl focus-within:ring-2 focus-within:ring-secondary/50 transition-all overflow-hidden">
                    <span className="pl-4 pr-2 text-gray-400 font-medium">₹</span>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full py-3 bg-transparent text-white placeholder-gray-600 focus:outline-none"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <TagIcon className="w-4 h-4 mr-2 text-accent" /> Category
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="relative w-full px-4 py-3 bg-[#0a0a16] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all appearance-none"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2 text-secondary" /> Billing Cycle & Renewal
                </label>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="relative group w-full sm:w-1/2">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                    <select
                      name="billingCycle"
                      value={formData.billingCycle}
                      onChange={handleChange}
                      className="relative w-full px-4 py-3 bg-[#0a0a16] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all appearance-none"
                    >
                      {billingCycles.map(cycle => (
                        <option key={cycle} value={cycle}>{cycle}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400 z-10">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                  <div className="relative group w-full sm:w-1/2">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                    <input
                      type="date"
                      name="nextRenewal"
                      value={formData.nextRenewal}
                      onChange={handleChange}
                      className="relative w-full px-4 py-3 bg-[#0a0a16] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all [color-scheme:dark]"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <CreditCardIcon className="w-4 h-4 mr-2 text-orange-400" /> Payment Method
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="relative w-full px-4 py-3 bg-[#0a0a16] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all appearance-none"
                  >
                    {paymentMethods.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Notes
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="e.g. Shared with family..."
                    className="relative w-full px-4 py-3 bg-[#0a0a16] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all resize-none"
                    rows="2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-4 border-t border-white/10 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 font-medium bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 hover:text-white transition-all border border-white/10 shadow-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:scale-105 shadow-lg'
                }`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
              ) : (
                <PlusCircleIcon className="w-5 h-5 mr-2" />
              )}
              {isSubmitting ? 'Saving...' : 'Add Subscription'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddSubscription;