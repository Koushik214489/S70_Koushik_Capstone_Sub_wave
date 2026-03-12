import React, { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import NewRenewalIcon from '../../assets/New Renewal.png.jpg';
import Sidebar from '../../components/Sidebar';

const AddSubscriptionModal = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    billingCycle: 'Monthly',
    nextRenewal: '',
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>
        <div className="relative transform overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm px-4 pb-4 pt-5 shadow-xl transition-all sm:w-full sm:max-w-lg sm:p-6 text-white">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Add new subscription</h3>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80">
                Subscription name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 mt-1"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80">
                Amount
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 mt-1"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80">
                Category
              </label>
              <select
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 mt-1"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="">Select category</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Productivity">Productivity</option>
                <option value="Utilities">Utilities</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80">
                Billing cycle
              </label>
              <select
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 mt-1"
                value={formData.billingCycle}
                onChange={(e) =>
                  setFormData({ ...formData, billingCycle: e.target.value })
                }
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80">
                Next renewal
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 mt-1"
                value={formData.nextRenewal}
                onChange={(e) =>
                  setFormData({ ...formData, nextRenewal: e.target.value })
                }
              />
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/5"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30"
                onClick={() => {
                  onAdd(formData);
                  onClose();
                }}
              >
                Add subscription
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const SubscriptionList = ({ subscriptions }) => (
  <div className="mt-6">
    {subscriptions.length === 0 ? (
      <div className="text-center py-12">
        <p className="text-white/70">No subscriptions found</p>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Next Renewal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {subscriptions.map((subscription) => (
              <tr key={subscription.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center p-2">
                      <img
                        className="w-full h-full object-contain"
                        src={subscription.icon}
                        alt={subscription.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        {subscription.name}
                      </div>
                      <div className="text-sm text-white/70">
                        {subscription.billingCycle}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-white/10 text-white">
                    {subscription.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  ${subscription.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                  {subscription.nextRenewal}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      subscription.status === 'Active'
                        ? 'bg-green-400/20 text-green-400'
                        : 'bg-red-400/20 text-red-400'
                    }`}
                  >
                    {subscription.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-white/80 hover:text-white mr-3">
                    Edit
                  </button>
                  <button className="text-red-400 hover:text-red-300">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

const Subscriptions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: 'Netflix',
      category: 'Entertainment',
      amount: 14.99,
      nextRenewal: '2024-03-15',
      status: 'Active',
      billingCycle: 'Monthly',
      icon: 'path/to/netflix-icon.png',
    },
    // Add more sample subscriptions as needed
  ]);

  const handleAddSubscription = (newSubscription) => {
    setSubscriptions([
      ...subscriptions,
      { ...newSubscription, id: subscriptions.length + 1, status: 'Active' },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-secondary">
      <Sidebar />
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src={NewRenewalIcon} alt="Subscriptions" className="w-8 h-8 object-contain" />
            <h1 className="text-2xl font-bold text-white">Subscriptions</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add subscription</span>
          </button>
        </div>

        <div className="mt-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-white/50" />
                </div>
                <input
                  type="text"
                  placeholder="Search subscriptions..."
                  className="block w-full pl-10 pr-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                />
              </div>
            </div>
            <select className="bg-white/5 border border-white/20 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50">
              <option value="all">All categories</option>
              <option value="entertainment">Entertainment</option>
              <option value="productivity">Productivity</option>
              <option value="utilities">Utilities</option>
            </select>
            <select className="bg-white/5 border border-white/20 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="all">All status</option>
            </select>
          </div>
        </div>

        <SubscriptionList subscriptions={subscriptions} />

        <AddSubscriptionModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddSubscription}
        />
      </div>
    </div>
  );
};

export default Subscriptions; 