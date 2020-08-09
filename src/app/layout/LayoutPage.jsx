import React from 'react';
import PropTypes from 'prop-types';
import Header from './header/Header';
import Footer from './footer/Footer';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  cloneToolbar: {
    ...theme.mixins.toolbar,
  },
}));

function LayoutPage({ children }) {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <div className={classes.cloneToolbar} />
      <div className={classes.container}>{children}</div>
      <Footer />
    </div>
  );
}

LayoutPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutPage;
