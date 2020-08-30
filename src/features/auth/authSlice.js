import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: false,
    initialized: false,
    user: null,
  },
  reducers: {
    setAuth: (state, { payload }) => {
      const { token, ...authUser } = payload;
      authUser.photoURL = authUser.photoURL ?? '/assets/user.png';
      if (token) {
        localStorage.setItem('token', token);
      }

      state.authenticated = true;
      state.initialized = true;
      state.user = authUser;
      state.user.providerId = 'password';
    },
    updateProfileImage: (state, { payload }) => {
      state.user.photoURL = payload;
    },
    setUnAuth: state => {
      localStorage.removeItem('token');

      state.authenticated = false;
      state.initialized = true;
      state.user = null;
    },
  },
});

export const { setAuth, setUnAuth, updateProfileImage } = authSlice.actions;
export default authSlice.reducer;
