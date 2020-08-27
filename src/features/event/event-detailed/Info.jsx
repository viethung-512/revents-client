import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';

import InfoIcon from '@material-ui/icons/Info';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RoomIcon from '@material-ui/icons/Room';
import Map from './Map';

import { getDate } from 'app/utils/helper';

Info.propTypes = {
  event: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
  },
  content: {
    padding: 0,
    '&:last-child': {
      padding: 0,
    },
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  showMapButton: {
    textTransform: 'unset',
    color: '#fff',
  },
}));

function Info({ event }) {
  const classes = useStyles();
  const [showMap, setShowMap] = useState(false);

  const toggleShowMap = () => setShowMap(!showMap);

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <List className={classes.list}>
          <ListItem alignItems='flex-start'>
            <ListItemIcon>
              <InfoIcon color='primary' />
            </ListItemIcon>
            <ListItemText>
              <Typography variant='body1' color='textPrimary'>
                {event.description}
              </Typography>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <CalendarTodayIcon color='primary' />
            </ListItemIcon>
            <ListItemText>
              <Typography variant='body1' color='textPrimary'>
                {getDate(event.date)}
              </Typography>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <RoomIcon color='primary' />
            </ListItemIcon>
            <ListItemText>
              <Typography variant='body1' color='textPrimary'>
                {event.venue}
              </Typography>
            </ListItemText>
            <ListItemSecondaryAction>
              <Button
                variant='contained'
                color='primary'
                className={classes.showMapButton}
                onClick={toggleShowMap}
              >
                {showMap ? 'Hide Map' : 'Show Map'}
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        {showMap && (
          <Map
            latLng={{
              lat: 40.7484405,
              lng: -73.98566440000002,
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default Info;
