import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { getDate } from 'app/utils/helper';

EventItem.propTypes = {
  event: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
    maxWidth: '8em',
    textDecoration: 'none',
  },
  cardContent: {
    padding: theme.spacing(1),
    '&:last-child': {
      padding: theme.spacing(1),
    },
  },
}));

function EventItem({ event }) {
  const classes = useStyles();
  return (
    <Card className={classes.card} component={Link} to={`/events/${event.id}`}>
      <CardMedia
        component='img'
        style={{ height: '5em' }}
        src={`/assets/categoryImages/${event?.category}.jpg`}
      />
      <CardContent className={classes.cardContent}>
        <Typography
          variant='body1'
          style={{ fontWeight: 500 }}
          gutterBottom
          align='center'
        >
          {event.title}
        </Typography>
        <Typography variant='body2' color='textSecondary' align='center'>
          {getDate(event.date, false, false)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default EventItem;
