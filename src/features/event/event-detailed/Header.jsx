import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { getDate } from 'app/utils/helper';
import Spinner from 'app/layout/commons/async/Spinner';
import useModal from 'hooks/useModal';
// import UnAuthModal from 'features/auth/UnAuthModal';

Header.propTypes = {
  event: PropTypes.object,
  authenticated: PropTypes.bool.isRequired,
};

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
  },
  media: {
    filter: 'brightness(0.3)',
    [theme.breakpoints.down('xs')]: {
      height: '15em',
    },
  },
  mainContent: {
    position: 'absolute',
    bottom: theme.spacing(3),
    left: theme.spacing(4),
    right: theme.spacing(3),
    color: '#fff',
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(1),
      left: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.35rem',
    },
  },
  actions: {
    padding: theme.spacing(2),
  },
  manageEventButton: {
    color: '#fff',
    width: '12em',
    marginLeft: 'auto !important',
    backgroundColor: theme.palette.warning.main,
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  button: {
    width: '12em',
  },
}));

function Header({
  event,
  authUserId,
  authenticated,
  toggleAttendEvent,
  loading,
}) {
  const classes = useStyles();
  const { openModal } = useModal();

  const isHost = event.host.id === authUserId;
  const isGoing = event.attendees.some(att => att.id === authUserId);

  const actions = authenticated ? (
    isHost ? (
      <Button
        variant='contained'
        className={classes.manageEventButton}
        component={Link}
        to={`/event/manage/${event.id}`}
      >
        Manage Event
      </Button>
    ) : isGoing ? (
      <Button
        variant='contained'
        className={classes.button}
        onClick={toggleAttendEvent}
        disabled={loading}
      >
        {loading ? <Spinner /> : 'Cancel My Place'}
      </Button>
    ) : (
      <Button
        variant='contained'
        color='primary'
        style={{ color: '#fff' }}
        onClick={toggleAttendEvent}
        disabled={loading}
        className={classes.button}
      >
        {loading ? <Spinner /> : 'Join This Event'}
      </Button>
    )
  ) : (
    <Button
      variant='contained'
      color='primary'
      style={{ color: '#fff' }}
      className={classes.button}
      onClick={() => openModal('UnAuthModal', { isPage: false })}
    >
      Join This Event
    </Button>
  );

  return (
    <Card className={classes.card}>
      <Grid container style={{ position: 'relative' }}>
        <Grid item container>
          <CardMedia
            component='img'
            src={`/assets/categoryImages/${event.category}.jpg`}
            className={classes.media}
          />
        </Grid>
        <Grid item className={classes.mainContent}>
          <Grid container direction='column'>
            <Grid item>
              <Typography variant='h4' gutterBottom className={classes.title}>
                {event.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body2'>{getDate(event.date)}</Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1'>
                Hosted By{' '}
                <Link
                  to={`/profile/${event.host.id}`}
                  style={{ color: '#fff', textDecoration: 'none' }}
                >
                  {event.host.username}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <CardActions className={classes.actions}>{actions}</CardActions>
      {/* <UnAuthModal
        open={openAuthModal}
        onClose={() => setOpenAuthModal(false)}
        wrappedRoute={false}
      /> */}
    </Card>
  );
}

export default Header;
