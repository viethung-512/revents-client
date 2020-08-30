import React from 'react';
import PropTypes from 'prop-types';
import Header from './header/Header';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    height: '100%',
    flex: 1,
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
    </div>
  );
}

LayoutPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutPage;
