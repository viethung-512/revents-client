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
      localStorage.setItem('token', token);

      state.authenticated = true;
      state.initialized = true;
      state.user = authUser;
    },
    setUnAuth: state => {
      localStorage.removeItem('token');

      state.authenticated = false;
      state.initialized = true;
      state.user = null;
    },
  },
});

export const { setAuth, setUnAuth } = authSlice.actions;
export default authSlice.reducer;
