import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from './store';
import { getTheme } from './theme';
import { useSelector } from 'react-redux';

// Components
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Layout from './components/Layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/Signup';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import VerificationPending from './pages/VerificationPending';
import AuthSuccess from './pages/AuthSuccess';
import AddSubscription from './pages/AddSubscription';
import Notifications from './pages/Notifications';
import Budget from './pages/Budget';
import Subscriptions from './pages/Subscriptions';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Landing from './pages/Landing';

const AppContent = () => {
  const { theme } = useSelector(state => state.ui);
  const currentTheme = getTheme(theme);

  React.useEffect(() => {
    // Apply theme string (e.g. 'theme-plum') to root html element
    const root = document.documentElement;
    root.classList.remove('theme-plum', 'theme-emerald', 'theme-amber', 'theme-coral', 'dark', 'light');
    if (theme && theme.startsWith('theme-')) {
      root.classList.add(theme);
    } else {
      root.classList.add('theme-plum'); // Fallback default
    }
  }, [theme]);

  // Keep MUI ThemeProvider for component consistency
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/verification-pending" element={<VerificationPending />} />
            <Route path="/auth-success" element={<AuthSuccess />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/add-subscription" element={<AddSubscription />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/budget" element={<Budget />} />
            </Route>
          </Route>

          {/* Landing Page Route */}
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider >
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
