import React, { useState } from 'react';
import Sticky from 'react-stickynode';
import { useQuery } from '@apollo/client';

// import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import LayoutPage from 'app/layout/pages/LayoutPage';
import EventList from './EventList';
import { EVENT_FETCH_LIST } from '../graphql/eventQuery';

function EventDashboard(props) {
  const [hasMore, setHasMore] = useState(true);
  const { loading, data, fetchMore } = useQuery(EVENT_FETCH_LIST, {
    variables: { limit: 2, offset: 0 },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const events = data ? data.getEvents : [];

  const handleLoadMore = () => {
    fetchMore({
      variables: { offset: events.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        if (fetchMoreResult.getEvents.length === 0) {
          setHasMore(false);
        }
        return {
          ...prev,
          getEvents: prev.getEvents
            ? [...prev.getEvents, ...fetchMoreResult.getEvents]
            : [...fetchMoreResult.getEvents],
        };
      },
    });
  };

  return (
    <LayoutPage>
      <Grid container spacing={2}>
        <Grid item container direction='column' md={8}>
          <EventList
            events={events}
            loading={loading}
            loadMore={handleLoadMore}
            hasMore={!loading && hasMore}
          />
        </Grid>
        <Hidden smDown>
          <Grid item container direction='column' md={4}>
            <Sticky enabled={true} top={88}>
              <Grid item>feed</Grid>
              <Grid item>filters</Grid>
              <Grid item>calendar</Grid>
            </Sticky>
          </Grid>
        </Hidden>
      </Grid>
    </LayoutPage>
  );
}

export default EventDashboard;
