import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EventListItem from './EventListItem';
import EventItemSkeleton from './EventItemSkeleton';
import Spinner from 'app/layout/commons/async/Spinner';

EventList.propTypes = {
  events: PropTypes.array,
  loading: PropTypes.bool,
  loadMore: PropTypes.func,
  hasMore: PropTypes.bool,
};

function EventList({ events, loading, loadMore, hasMore }) {
  return (
    <Grid container direction='column'>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        initialLoad={true}
      >
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
      </InfiniteScroll>
      <Grid item container justify='center' alignItems='center'>
        {loading && <Spinner />}
      </Grid>
    </Grid>
  );
}

export default EventList;
