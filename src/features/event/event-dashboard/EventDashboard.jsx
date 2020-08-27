import React, { useState, useEffect } from 'react';
import Sticky from 'react-stickynode';
import { useQuery } from '@apollo/client';

// import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import LayoutPage from 'app/layout/pages/LayoutPage';
import EventList from './EventList';
import { EVENT_FETCH_LIST } from 'app/graphql/event';

function EventDashboard(props) {
  const [events, setEvents] = useState([]);
  const { loading, data } = useQuery(EVENT_FETCH_LIST);

  useEffect(() => {
    if (data && data.getEvents) {
      setEvents(data.getEvents);
    }
  }, [data]);

  return (
    <LayoutPage>
      <Grid container spacing={2}>
        <Grid item container direction='column' md={8}>
          <EventList events={events} loading={loading} />
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
