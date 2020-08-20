import React from 'react';
import PropTypes from 'prop-types';
import Header from './header/Header';
import Footer from './footer/Footer';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    minHeight: '150vh',
    height: '100%',
  },
  cloneToolbar: {
    ...theme.mixins.toolbar,
  },
}));

function LayoutPage({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.cloneToolbar} />
      <Container className={classes.container}>{children}</Container>
      <Footer />
    </div>
  );
}

LayoutPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutPage;
