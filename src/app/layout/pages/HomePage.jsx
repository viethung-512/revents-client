import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage:
      'linear-gradient(135deg, rgb(24, 42, 115) 0%, rgb(33, 138, 174) 69%, rgb(32, 167, 172) 89%) !important;',
    color: '#fff',
    height: '100vh',
    width: '100vw',
  },
  logo: {
    width: '5em',
    [theme.breakpoints.down('xs')]: {
      width: '3em',
    },
  },
  title: {
    fontSize: '5rem',
    fontWeight: 400,
    [theme.breakpoints.down('xs')]: {
      fontSize: '3rem',
    },
  },
}));

function HomePage(props) {
  const classes = useStyles();

  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      className={classes.root}
    >
      <Grid item>
        <Grid container direction='column'>
          <Grid
            item
            container
            justify='center'
            alignItems='center'
            style={{ marginBottom: 24 }}
          >
            <Grid item>
              <img alt='logo' src='/assets/logo.png' className={classes.logo} />
            </Grid>
            <Grid item>
              <Typography variant='h1' className={classes.title}>
                Re-vents
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justify='center'>
            <Button
              variant='outlined'
              color='inherit'
              size='large'
              endIcon={<ArrowForwardIcon fontSize='inherit' />}
              component={Link}
              to='/events'
            >
              Get started
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HomePage;
