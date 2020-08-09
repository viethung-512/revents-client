import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';

import { clear } from './alertSlice';

function TransitionLeft(props) {
  return <Slide {...props} direction='left' />;
}

function AlertManager(props) {
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alert);

  const handleClose = () => dispatch(clear());

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionComponent={TransitionLeft}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        elevation={6}
        variant='filled'
        onClose={handleClose}
        severity={alert.status}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
}

export default AlertManager;
