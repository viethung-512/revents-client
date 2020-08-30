import React from 'react';
import { Link } from 'react-router-dom';
import LayoutPage from './LayoutPage';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: '30em',
  },
  title: {
    fontFamily: 'Dancing Script',
    fontWeight: 700,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  description: {
    fontFamily: 'Caveat',
    fontSize: '1.5rem',
  },
  button: {
    borderRadius: 24,
    textTransform: 'unset',
  },
}));

function NotFoundPage(props) {
  const classes = useStyles();

  return (
    <LayoutPage>
      <Grid container justify='center'>
        <Grid container direction='column' className={classes.container}>
          <Grid item>
            <Typography
              variant='h1'
              color='secondary'
              align='center'
              className={classes.title}
            >
              Oops!
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant='h5'
              gutterBottom
              align='center'
              style={{ fontWeight: 500, textTransform: 'uppercase' }}
            >
              404-Page Not Found
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant='body1'
              gutterBottom
              color='textSecondary'
              align='center'
              className={classes.description}
            >
              The page you are looking for might have been removed, had it name
              changed or is temporarily unavailable
            </Typography>
          </Grid>
          <Grid item container justify='center'>
            <Button
              variant='contained'
              component={Link}
              to='/events'
              color='secondary'
              size='large'
              className={classes.button}
            >
              Go to Events Page
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </LayoutPage>
  );
}

export default NotFoundPage;
