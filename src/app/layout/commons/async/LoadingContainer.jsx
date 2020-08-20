import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Spinner from './Spinner';

LoadingContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  size: PropTypes.number,
  thickness: PropTypes.number,
};

LoadingContainer.defaultProps = {
  loading: false,
  size: 40,
  thickness: 4.5,
};

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    opacity: '0.6 !important',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function LoadingContainer({ loading, size, thickness, color }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Backdrop className={classes.backdrop} open={loading}>
      <Spinner
        color={color ? color : theme.palette.primary.dark}
        size={size}
        thickness={thickness}
      />
    </Backdrop>
  );
}
