import React from 'react';
import { Link } from 'react-router-dom';
import ElevationScroll from '../../commons/ElevationScroll';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.divider,
    borderBottomStyle: 'solid',
  },
  tabsIndicator: {
    display: 'none',
  },
  logoWrapper: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}));

function Header(props) {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (e, newTab) => setTabValue(newTab);

  return (
    <ElevationScroll>
      <AppBar color='inherit' className={classes.appBar}>
        <Toolbar disableGutters>
          <Container>
            <Grid container justify='space-between' alignItems='center'>
              <Grid item>
                <Grid container alignItems='center'>
                  <Grid item>
                    <Typography
                      variant='body1'
                      component={Link}
                      to='/'
                      className={classes.logoWrapper}
                    >
                      Logo
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Tabs
                      variant='fullWidth'
                      value={tabValue}
                      onChange={handleChangeTab}
                      classes={{
                        indicator: classes.tabsIndicator,
                      }}
                    >
                      <Tab
                        label='PlayGround'
                        component={Link}
                        to='/playground'
                      />
                    </Tabs>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant='body1' color='textPrimary'>
                  Auth Menu
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
}

export default Header;
