import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, API_BASE_URL } from '../services/api';
import SubwaveImage from '../assets/Background.jpg';
// import WelcomeAnimation from '../components/WelcomeAnimation'; // Animation temporarily disabled for reliability

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Attempt login
      const res = await auth.login({ email, password });
      // Ensure token and user are present
      if (res.data.token && res.data.user) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        // Immediately redirect to dashboard (bypassing animation)
        navigate('/dashboard');
      } else {
        setError('Login failed: Invalid response from server.');
      }
    } catch (err) {
      if (err.response?.data?.requiresVerification) {
        // If email needs verification, redirect to verification pending page
        navigate('/verification-pending', {
          state: {
            email: email,
            message: err.response.data.message
          }
        });
        return;
      }
      setError(err.response?.data?.message || 'An error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${API_BASE_URL}/api/auth/google`;
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-[#050511] overflow-hidden font-sans">
      {/* Background Orbs to match Landing */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-600/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

      <div className="relative z-10 p-10 rounded-[2rem] w-full max-w-sm bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-2xl leading-none">S</span>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome Back</h2>
        <p className="text-center text-gray-400 text-sm mb-8">Sign in to SubWave</p>

        {/* Success Message */}
        {location.state?.message && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/50 text-green-400 rounded-lg text-center text-sm backdrop-blur-sm">
            {location.state.message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg text-center text-sm backdrop-blur-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              id="email"
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              )}
            </button>
          </div>
          <p
            className="text-right text-xs text-secondary hover:text-purple-300 cursor-pointer pt-1 transition-colors"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 mt-4 bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] text-white font-semibold rounded-xl transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:scale-[1.02]'
              }`}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-transparent text-gray-500 backdrop-blur-xl">Or continue with</span>
            </div>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="mt-6 w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white hover:bg-white/10 transition duration-300"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-primary hover:text-cyan-300 cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold transition-colors"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
