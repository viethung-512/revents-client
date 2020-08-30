import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';

import WatchLaterIcon from '@material-ui/icons/WatchLater';
import RoomIcon from '@material-ui/icons/Room';
import BlockIcon from '@material-ui/icons/Block';

import { getDate } from 'app/utils/helper';

EventListItem.propTypes = {
  event: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[2],
    border: `1px solid ${theme.palette.divider}`,
  },
  header: {
    alignItems: 'flex-start',
  },
  avatar: {
    width: 80,
    height: 80,
  },
  title: {
    lineHeight: 1,
    marginBottom: theme.spacing(1),
  },
  content: {
    '&:last-child': {
      paddingBottom: '16px !important',
    },
  },
  icon: {
    fontSize: '1rem',
    marginRight: theme.spacing(1),
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: theme.palette.divider,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  attendees: {
    backgroundColor: theme.palette.background.default,
  },
  attendeeAvatar: {
    height: 16,
    width: 16,
  },
  viewButton: {
    color: '#fff',
    textTransform: 'unset',
  },
  ribbon: {
    backgroundColor: theme.palette.error.dark,
    color: '#fff',
    borderRadius: 0,
  },
}));

function EventListItem({ event }) {
  const classes = useStyles();
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            alt='avatar'
            src={event?.host?.photoURL}
            className={classes.avatar}
            component={Link}
            to={`/profile/${event?.host.id}`}
          >
            <img
              alt='avatar placeholder'
              style={{ width: '100%' }}
              src='/assets/user.png'
            />
          </Avatar>
        }
        title={
          <Typography variant='h6' className={classes.title}>
            {event.title}
          </Typography>
        }
        subheader={
          <Typography variant='caption' color='textSecondary'>
            hosted by{' '}
            <Typography
              variant='caption'
              color='primary'
              component={Link}
              to={`/profile/${event?.host.id}`}
              style={{ textDecoration: 'none' }}
            >
              {event.host.username}
            </Typography>
          </Typography>
        }
        action={
          event.isCancelled ? (
            <Chip
              size='small'
              icon={matchesXS ? <BlockIcon style={{ color: '#fff' }} /> : null}
              label={matchesXS ? 'Cancelled' : 'This event has been cancelled'}
              className={classes.ribbon}
            />
          ) : null
        }
        className={classes.header}
      />
      <Divider />
      <CardContent className={classes.content}>
        <Grid container>
          <Grid item>
            <Grid container alignItems='center'>
              <WatchLaterIcon className={classes.icon} />
              <Typography variant='body2'>{getDate(event.date)}</Typography>
              {/* <Typography variant='body2'>date</Typography> */}
            </Grid>
          </Grid>

          <Grid item>
            <div className={classes.divider} />
          </Grid>

          <Divider orientation='vertical' />

          <Grid item>
            <Grid container alignItems='center'>
              <RoomIcon className={classes.icon} />
              <Typography variant='body2'>{event.venue}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      {event && event.attendees && event.attendees.length > 0 && (
        <CardContent className={clsx(classes.content, classes.attendees)}>
          <AvatarGroup max={4}>
            {event.attendees.map(attendee => (
              <Avatar
                key={attendee.id}
                alt={attendee.name}
                src={attendee.photoURL}
                component={Link}
                to={`/profile/${attendee?.id}`}
              >
                <img
                  alt='avatar placeholder'
                  src='/assets/user.png'
                  style={{ width: '100%' }}
                />
              </Avatar>
            ))}
          </AvatarGroup>
        </CardContent>
      )}

      <Divider />

      <CardContent className={classes.content}>
        <Grid container spacing={1}>
          <Hidden xsDown>
            <Grid item container>
              <Typography variant='body1'>{event.description}</Typography>
            </Grid>
          </Hidden>
          <Grid item container justify='flex-end'>
            <Button
              variant='contained'
              color='primary'
              className={classes.viewButton}
              component={Link}
              to={`/events/${event.id}`}
            >
              View
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default EventListItem;
