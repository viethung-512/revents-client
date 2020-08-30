import { createReducer } from '@reduxjs/toolkit';

const locationReducer = createReducer(
  {
    prevLocation: null,
    currentLocation: null,
  },
  {
    '@@router/LOCATION_CHANGE': (state, action) => {
      state.prevLocation = state.currentLocation;
      state.currentLocation = action.payload.location;
    },
  }
);

export default locationReducer;
