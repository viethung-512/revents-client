import React, { useState, useEffect } from 'react';
import Sticky from 'react-stickynode';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';

// import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import LayoutPage from 'app/layout/pages/LayoutPage';
import EventList from './EventList';
import { EVENT_FETCH_LIST } from '../graphql/eventQuery';
import EventFilters from './EventFilters';
import { eventFilters } from 'app/utils/constants';

function EventDashboard(props) {
  const [hasMore, setHasMore] = useState(true);
  // const [events, setEvents] = useState([]);
  const [predicate, setPredicate] = useState({
    filter: eventFilters.EVENT_ALL,
    date: { startDate: new Date() },
  });
  const { authenticated } = useSelector(state => state.auth);
  const { loading, data, fetchMore, refetch } = useQuery(EVENT_FETCH_LIST, {
    variables: { limit: 2, offset: 0 },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (predicate.filter === eventFilters.EVENT_DATE) {
      refetch({
        filterType: predicate.filter,
        startDate: predicate.date.startDate,
      });
    } else {
      refetch({ filterType: predicate.filter });
    }
  }, [predicate.filter]);

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
              <Grid item>
                <EventFilters
                  authenticated={authenticated}
                  predicate={predicate}
                  setPredicate={setPredicate}
                />
              </Grid>
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
