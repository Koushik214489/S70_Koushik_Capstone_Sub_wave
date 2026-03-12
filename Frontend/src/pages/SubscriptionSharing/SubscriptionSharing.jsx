import React, { useState, useEffect } from 'react';
import { UserPlusIcon, UsersIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import Sidebar from '../../components/Sidebar';

const SharedSubscriptionCard = ({ subscription, onManage }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center p-2">
          <img
            src={subscription.logo || 'https://via.placeholder.com/40'}
            alt={subscription.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-white">{subscription.name}</h3>
          <p className="text-sm text-white/70">
            {subscription.members.length} members
          </p>
        </div>
      </div>
      <button
        onClick={() => onManage(subscription)}
        className="px-4 py-2 text-white/80 hover:text-white font-medium"
      >
        Manage
      </button>
    </div>
    <div className="border-t border-white/10 pt-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-white/70">Your share</p>
          <p className="text-lg font-medium text-white">
            ₹{subscription.userShare}/mo
          </p>
        </div>
        <div>
          <p className="text-sm text-white/70">Total cost</p>
          <p className="text-lg font-medium text-white">
            ₹{subscription.totalCost}/mo
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-white/70 mb-2">Members</p>
        <div className="flex -space-x-2">
          {subscription.members.map((member, index) => (
            <img
              key={index}
              className="w-8 h-8 rounded-full border-2 border-white/20"
              src={member.avatar || 'https://via.placeholder.com/32'}
              alt={member.name}
              title={member.name}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const InviteCard = ({ invite, onAccept, onDecline }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center p-2">
          <img
            src={invite.subscription.logo || 'https://via.placeholder.com/40'}
            alt={invite.subscription.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-white">
            {invite.subscription.name}
          </h3>
          <p className="text-sm text-white/70">
            Invited by {invite.inviter.name}
          </p>
        </div>
      </div>
    </div>
    <div className="border-t border-white/10 pt-4">
      <div className="mb-4">
        <p className="text-sm text-white/70">Your share would be</p>
        <p className="text-lg font-medium text-white">
          ₹{invite.share}/mo
        </p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => onAccept(invite)}
          className="flex-1 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
        >
          Accept
        </button>
        <button
          onClick={() => onDecline(invite)}
          className="flex-1 px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  </div>
);

const SubscriptionSharing = () => {
  const [sharedSubscriptions, setSharedSubscriptions] = useState([]);
  const [invites, setInvites] = useState([]);
  const [stats, setStats] = useState({
    totalShared: 0,
    monthlySavings: 0,
    activeMembers: 0,
  });

  useEffect(() => {
    // TODO: Fetch shared subscriptions, invites, and stats from backend
    setSharedSubscriptions([
      {
        id: 1,
        name: 'Netflix Premium',
        logo: 'https://via.placeholder.com/40',
        userShare: 4.99,
        totalCost: 19.99,
        members: [
          { name: 'John Doe', avatar: 'https://via.placeholder.com/32' },
          { name: 'Jane Smith', avatar: 'https://via.placeholder.com/32' },
          { name: 'Mike Johnson', avatar: 'https://via.placeholder.com/32' },
        ],
      },
      // Add more mock data as needed
    ]);

    setStats({
      totalShared: 5,
      monthlySavings: 25.50,
      activeMembers: 12,
    });
  }, []);

  const handleManageSubscription = (subscription) => {
    // TODO: Implement subscription management
    console.log('Manage subscription:', subscription);
  };

  const handleAcceptInvite = (invite) => {
    // TODO: Implement invite acceptance
    console.log('Accept invite:', invite);
  };

  const handleDeclineInvite = (invite) => {
    // TODO: Implement invite decline
    console.log('Decline invite:', invite);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-secondary">
      <Sidebar />
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Subscription Sharing</h1>
          <button className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
            <UserPlusIcon className="h-5 w-5" />
            <span>Share New Subscription</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <UsersIcon className="h-8 w-8 text-white/80 mb-2" />
            <h3 className="text-lg font-medium text-white">
              Total Shared
            </h3>
            <p className="text-2xl font-semibold text-white">
              {stats.totalShared}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <CurrencyDollarIcon className="h-8 w-8 text-white/80 mb-2" />
            <h3 className="text-lg font-medium text-white">
              Monthly Savings
            </h3>
            <p className="text-2xl font-semibold text-white">
              ₹{stats.monthlySavings}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <UserPlusIcon className="h-8 w-8 text-white/80 mb-2" />
            <h3 className="text-lg font-medium text-white">
              Active Members
            </h3>
            <p className="text-2xl font-semibold text-white">
              {stats.activeMembers}
            </p>
          </div>
        </div>

        {invites.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Pending Invites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {invites.map((invite) => (
                <InviteCard
                  key={invite.id}
                  invite={invite}
                  onAccept={handleAcceptInvite}
                  onDecline={handleDeclineInvite}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Your Shared Subscriptions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sharedSubscriptions.map((subscription) => (
              <SharedSubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onManage={handleManageSubscription}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSharing; 