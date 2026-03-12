const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Verify Google OAuth credentials
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error('Missing Google OAuth credentials in environment variables');
  process.exit(1);
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.NODE_ENV === 'production'
        ? 'https://s70-koushik-capstone-sub-wave.onrender.com/api/auth/google/callback'
        : '/api/auth/google/callback',
      scope: ['profile', 'email', 'https://www.googleapis.com/auth/gmail.readonly'],
      accessType: 'offline', // Request a refresh token
      prompt: 'consent' // Always ask for consent to ensure refresh token is provided
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Update tokens if they exist
          user.googleAccessToken = accessToken;
          if (refreshToken) {
            user.googleRefreshToken = refreshToken;
          }
          await user.save();
          return done(null, user);
        }

        // If user doesn't exist, create new user
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: 'google-oauth-' + Math.random().toString(36).substring(7),
          isEmailVerified: true, // Since Google has verified the email
          googleAccessToken: accessToken,
          googleRefreshToken: refreshToken
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport; 