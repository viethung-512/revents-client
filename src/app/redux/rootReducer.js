import counterReducer from 'features/counter/counterSlice';
import alertReducer from '../cores/alert/alertSlice';
import drawerReducer from '../cores/drawer/drawerSlice';
import modalReducer from '../cores/modal/modalSlice';
import authReducer from 'features/auth/authSlice';
import { connectRouter } from 'connected-react-router';
import locationReducer from './locationReducer';

export default function (history) {
  return {
    router: connectRouter(history),
    counter: counterReducer,
    alert: alertReducer,
    drawer: drawerReducer,
    modal: modalReducer,
    auth: authReducer,
    location: locationReducer,
  };
}
