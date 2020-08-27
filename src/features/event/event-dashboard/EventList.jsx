import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EventListItem from './EventListItem';
import EventItemSkeleton from './EventItemSkeleton';

EventList.propTypes = {
  events: PropTypes.array,
  loading: PropTypes.bool,
};

function EventList({ events, loading }) {
  return (
    <Grid container direction='column'>
      {loading ? (
        <Fragment>
          <Grid item>
            <EventItemSkeleton />
          </Grid>
          <Grid item>
            <EventItemSkeleton />
          </Grid>
        </Fragment>
      ) : events.length === 0 ? (
        <Typography variant='body1'>
          Can not find any event at the moment
        </Typography>
      ) : (
        events.map(event => (
          <Grid item key={event.id}>
            <EventListItem event={event} />
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default EventList;
