import counterReducer from 'features/counter/counterSlice';
import alertReducer from 'features/cores/alert/alertSlice';
import drawerReducer from 'features/cores/drawer/drawerSlice';
import modalReducer from 'features/cores/modal/modalSlice';

export default {
  counter: counterReducer,
  alert: alertReducer,
  drawer: drawerReducer,
  modal: modalReducer,
};
