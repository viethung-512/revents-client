import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    open: false,
    status: 'info',
    message: '',
  },
  reducers: {
    success: (state, action) => {
      state.open = true;
      state.status = 'success';
      state.message = action.payload.message;
    },
    error: (state, action) => {
      state.open = true;
      state.status = 'error';
      state.message = action.payload.message;
    },
    warning: (state, action) => {
      state.open = true;
      state.status = 'warning';
      state.message = action.payload.message;
    },
    info: (state, action) => {
      state.open = true;
      state.status = 'info';
      state.message = action.payload.message;
    },
    clear: state => {
      state.open = false;
      state.message = '';
    },
  },
});

export const { success, error, warning, info, clear } = alertSlice.actions;
export default alertSlice.reducer;
