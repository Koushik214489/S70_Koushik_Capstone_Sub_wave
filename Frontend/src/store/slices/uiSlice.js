import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: true,
  theme: localStorage.getItem('theme') || 'theme-plum',
  notifications: [],
  loading: {
    global: false,
    subscriptions: false,
    profile: false
  },
  errors: {
    global: null,
    subscriptions: null,
    profile: null
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', state.theme);
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    setLoading: (state, action) => {
      const { component, isLoading } = action.payload;
      state.loading[component] = isLoading;
    },
    setError: (state, action) => {
      const { component, error } = action.payload;
      state.errors[component] = error;
    },
    clearError: (state, action) => {
      state.errors[action.payload] = null;
    },
    clearAllErrors: (state) => {
      Object.keys(state.errors).forEach(key => {
        state.errors[key] = null;
      });
    }
  }
});

export const {
  toggleSidebar,
  toggleTheme,
  setTheme,
  addNotification,
  removeNotification,
  setLoading,
  setError,
  clearError,
  clearAllErrors
} = uiSlice.actions;

export default uiSlice.reducer; 