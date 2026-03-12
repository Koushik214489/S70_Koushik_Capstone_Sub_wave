import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '../assets/Dashboard.png.jpg';
import SpotifyIcon from '../assets/Spotify.png.jpg';
import BudgetIcon from '../assets/Budget.png.jpg';
import NotificationIcon from '../assets/Notification.png.jpg';
import SettingsIcon from '../assets/Settings.png.jpg';
import HelpIcon from '../assets/Help and support.png.jpg';
import NewRenewalIcon from '../assets/New Renewal.png.jpg';
import AdobeIcon from '../assets/Adobe.png.jpg';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
    { path: '/subscriptions', label: 'Subscriptions', icon: NewRenewalIcon },
    { path: '/budget', label: 'Budget', icon: BudgetIcon },
    { path: '/notifications', label: 'Notifications', icon: NotificationIcon },
    { path: '/settings', label: 'Settings', icon: SettingsIcon },
    { path: '/help', label: 'Help & Support', icon: HelpIcon },
  ];

  const handleLogout = () => {
    // Clear all auth data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('userName');
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="h-screen w-64 bg-gradient-to-r from-blue-400 to-secondary fixed left-0 top-0 shadow-2xl">
      <div className="p-4">
        <Link to="/dashboard" className="flex items-center space-x-2 mb-8">
          <span className="text-2xl font-bold text-white drop-shadow-lg">SubWave</span>
        </Link>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive(item.path)
                  ? 'bg-white/20 text-white shadow-lg transform scale-105'
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="w-7 h-7 flex items-center justify-center bg-white rounded-lg p-1">
                <img 
                  src={item.icon} 
                  alt={item.label} 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t border-white/10 bg-white/5">
        <div className="flex items-center space-x-3 px-4 py-3">
          <img
            src={localStorage.getItem('userAvatar') || 'https://via.placeholder.com/40'}
            alt="User"
            className="w-10 h-10 rounded-full ring-2 ring-white/30"
          />
          <div>
            <div className="font-medium text-white">
              {JSON.parse(localStorage.getItem('user'))?.name || 'User'}
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 