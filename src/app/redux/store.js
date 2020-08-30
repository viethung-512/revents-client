import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import rootReducer from './rootReducer';

export const history = createBrowserHistory();

export default configureStore({
  reducer: rootReducer(history),
});
