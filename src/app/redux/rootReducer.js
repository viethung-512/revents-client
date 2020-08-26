import counterReducer from 'features/counter/counterSlice';
import alertReducer from '../cores/alert/alertSlice';
import drawerReducer from '../cores/drawer/drawerSlice';
import modalReducer from '../cores/modal/modalSlice';
import authReducer from 'features/auth/authSlice';

export default {
  counter: counterReducer,
  alert: alertReducer,
  drawer: drawerReducer,
  modal: modalReducer,
  auth: authReducer,
};
