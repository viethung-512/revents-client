import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import useDrawer from 'hooks/useDrawer';

const useStyles = makeStyles(theme => ({
  paper: {
    minWidth: '15em',
  },
}));

function DrawerBase({ children, drawerType, ...rest }) {
  const classes = useStyles();
  const { getDrawerStatus, closeDrawer } = useDrawer();

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const status = getDrawerStatus(drawerType);

  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      open={status}
      onClose={closeDrawer}
      onOpen={() => {}}
      PaperProps={{
        className: classes.paper,
      }}
      {...rest}
    >
      {children}
    </SwipeableDrawer>
  );
}

DrawerBase.propTypes = {
  children: PropTypes.node.isRequired,
  drawerType: PropTypes.string.isRequired,
};

export default DrawerBase;
