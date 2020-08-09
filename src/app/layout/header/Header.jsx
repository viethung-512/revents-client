import React from 'react';
import ElevationScroll from '../commons/ElevationScroll';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.divider,
    borderBottomStyle: 'solid',
  },
}));

function Header(props) {
  const classes = useStyles();

  return (
    <ElevationScroll>
      <AppBar color='inherit' className={classes.appBar}>
        <Toolbar>
          <Grid container justify='space-between' alignItems='center'>
            <Grid item>logo</Grid>
            <Grid item>auth menu</Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
}

export default Header;
