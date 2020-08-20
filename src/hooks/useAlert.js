import { useDispatch } from 'react-redux';
import {
  success,
  error,
  warning,
  info,
  clear,
} from 'app/cores/alert/alertSlice';

const useAlert = () => {
  const dispatch = useDispatch();

  const alertSuccess = message => dispatch(success(message));
  const alertError = message => dispatch(error(message));
  const alertWarning = message => dispatch(warning(message));
  const alertInfo = message => dispatch(info(message));
  const alertClear = () => dispatch(clear());

  return {
    alertSuccess,
    alertError,
    alertWarning,
    alertInfo,
    alertClear,
  };
};

export default useAlert;
