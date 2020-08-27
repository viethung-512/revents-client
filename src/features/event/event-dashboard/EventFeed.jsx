import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AnnouncementIcon from '@material-ui/icons/Announcement';

EventFeed.propTypes = {
  feed: PropTypes.array,
};

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  headerIcon: {
    minWidth: 'unset',
    marginRight: theme.spacing(2),
  },
  headerText: {
    fontWeight: 500,
  },
  strongText: {
    color: theme.palette.text.primary,
    fontWeight: 500,
    textDecoration: 'none',
  },
}));

function EventFeed({ feed }) {
  const classes = useStyles();

  const renderSummary = feedItem => {
    switch (feedItem.code) {
      case 'joined-event':
        return (
          <Typography variant='body1' color='textPrimary'>
            <Link
              to={`/profile/${feedItem.userUid}`}
              className={classes.strongText}
            >
              {feedItem.displayName}
            </Link>{' '}
            has signed up to{' '}
            <Link
              to={`/events/${feedItem.eventId}`}
              className={classes.strongText}
            >
              {feedItem.title}
            </Link>
          </Typography>
        );
      case 'left-event':
        return (
          <Typography variant='body1' color='textPrimary'>
            <Link
              to={`/profile/${feedItem.userUid}`}
              className={classes.strongText}
            >
              {feedItem.displayName}
            </Link>{' '}
            has cancelled their place on{' '}
            <Link
              to={`/events/${feedItem.eventId}`}
              className={classes.strongText}
            >
              {feedItem.title}
            </Link>
          </Typography>
        );
      default:
        return '';
    }
  };

  return (
    <Paper className={classes.paper}>
      <List style={{ paddingTop: 0 }}>
        <ListItem divider>
          <ListItemIcon className={classes.headerIcon}>
            <AnnouncementIcon color='primary' />
          </ListItemIcon>
          <ListItemText>
            <Typography
              variant='body1'
              color='primary'
              className={classes.headerText}
            >
              News Feed
            </Typography>
          </ListItemText>
        </ListItem>
        {feed.length > 0 ? (
          feed.map(feedItem => (
            <ListItem button key={feedItem?.id} alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar src={feedItem?.photoURL} />
              </ListItemAvatar>
              <ListItemText>
                <Typography variant='body2' color='textSecondary'>
                  {formatDistance(feedItem?.date, new Date())}
                </Typography>
                {renderSummary(feedItem)}
              </ListItemText>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText>
              <Typography variant='body1'>No Feed</Typography>
            </ListItemText>
          </ListItem>
        )}
      </List>
    </Paper>
  );
}

export default EventFeed;
