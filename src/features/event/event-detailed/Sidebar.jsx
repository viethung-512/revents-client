import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Sticky from 'react-stickynode';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DefaultAvatar from 'app/layout/commons/DefaultAvatar';

Sidebar.propTypes = {
  attendees: PropTypes.array.isRequired,
  authUserId: PropTypes.any,
  hostId: PropTypes.any,
};

Sidebar.defaultProps = {
  attendees: [],
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  content: {
    padding: 0,
    '&:last-child': {
      padding: 0,
    },
  },
  attendeeContainer: {
    padding: theme.spacing(2),
  },
  attendeeAvatar: {
    marginRight: theme.spacing(2),
  },
  attendeeName: {
    textDecoration: 'none',
  },
  attendeeExtra: {
    display: 'flex',
    flexDirection: 'column',
  },
  attendeeHostTag: {
    color: '#fff',
    backgroundColor: theme.palette.warning.main,
    borderRadius: 0,
    height: 16,
    top: -20,
    right: -theme.spacing(2),
    position: 'absolute',
  },
  followButton: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

function Sidebar({ attendees, authUserId, host }) {
  const classes = useStyles();

  // const formattedAttendees = formatAttendees(attendees, hostId);

  return (
    <Sticky enabled={true} top={88}>
      <Card className={classes.root}>
        <CardHeader
          className={classes.header}
          subheader={`${attendees.length} ${
            attendees.length > 1 ? 'People' : 'Person'
          } Going`}
          subheaderTypographyProps={{
            style: {
              color: '#fff',
              lineHeight: 1,
            },
            align: 'center',
          }}
        />
        <CardContent className={classes.content}>
          <List>
            <ListItem divider={attendees.length > 1}>
              <ListItemAvatar>
                <Avatar
                  alt={host.username}
                  src={host.photoURL}
                  component={Link}
                  to={`/profile/${host.id}`}
                  className={classes.attendeeAvatar}
                >
                  <DefaultAvatar />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>
                <Typography
                  variant='body1'
                  component={Link}
                  to={`/profile/${host.id}`}
                  color='secondary'
                  style={{ textDecoration: 'unset' }}
                >
                  {host.username}
                </Typography>
              </ListItemText>
              <ListItemSecondaryAction className={classes.attendeeExtra}>
                <Chip
                  label='Host'
                  size='small'
                  variant='outlined'
                  className={classes.attendeeHostTag}
                />
                {host.id !== authUserId && (
                  <IconButton className={classes.followButton} size='small'>
                    <PersonAddIcon fontSize='small' />
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
            {attendees
              .filter(attendee => attendee.id !== host.id)
              .map((attendee, index) => (
                <ListItem
                  key={attendee.id}
                  divider={index < attendees.length - 2}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={attendee.username}
                      src={attendee.photoURL}
                      component={Link}
                      to={`/profile/${attendee.id}`}
                      className={classes.attendeeAvatar}
                    >
                      <DefaultAvatar />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography
                      variant='body1'
                      component={Link}
                      to={`/profile/${attendee.id}`}
                      color='secondary'
                      style={{ textDecoration: 'unset' }}
                    >
                      {attendee.username}
                    </Typography>
                  </ListItemText>
                  <ListItemSecondaryAction className={classes.attendeeExtra}>
                    {attendee.id !== authUserId && (
                      <IconButton className={classes.followButton} size='small'>
                        <PersonAddIcon fontSize='small' />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        </CardContent>
      </Card>
    </Sticky>
  );
}

export default Sidebar;
