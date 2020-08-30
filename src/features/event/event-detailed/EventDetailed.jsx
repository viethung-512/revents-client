import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useMutation } from '@apollo/client';

import LayoutPage from 'app/layout/pages/LayoutPage';
import EventDetailedHeader from './Header';
import EventDetailedInfo from './Info';
// import EventDetailedChats from './Chats';
import EventDetailedSidebar from './Sidebar';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LoadingContainer from 'app/layout/commons/async/LoadingContainer';
import EventDetailedSkeleton from './EventDetailedSkeleton';
import { EVENT_FETCH_ITEM } from '../graphql/eventQuery';
import { EVENT_ATTEND_TOGGLE } from '../graphql/eventMutation';
import useAlert from 'hooks/useAlert';

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2),
  },
}));

function EventDetailed({ match, history }) {
  const { alertError } = useAlert();
  const classes = useStyles();
  const eventId = match.params.id;
  const [event, setEvent] = useState(null);
  const { user, authenticated } = useSelector(state => state.auth);
  const { loading } = useQuery(EVENT_FETCH_ITEM, {
    variables: { id: eventId },
    onError: err => history.push('/not-found'),
    onCompleted: data => setEvent(data.getEvent),
  });
  const [toggleAttendEvent, { loading: toggleLoading }] = useMutation(
    EVENT_ATTEND_TOGGLE,
    {
      onError: err => {
        console.log(err, 'Error while cancel toggle event');
        alertError('Some thing went wrong, please try again');
      },
      update: (proxy, { data }) => {
        const cache = proxy.readQuery({
          query: EVENT_FETCH_ITEM,
          variables: { id: eventId },
        });

        proxy.writeQuery({
          query: EVENT_FETCH_ITEM,
          variables: { id: eventId },
          data: {
            ...cache,
            getEvent: {
              ...cache.getEvent,
              attendees: data.toggleAttendEvent.attendees,
            },
          },
        });

        setEvent({ ...event, attendees: data.toggleAttendEvent.attendees });
      },
    }
  );

  const handleToggleEvent = () =>
    toggleAttendEvent({ variables: { eventId, userId: user.id } });

  return (
    <LayoutPage>
      <LoadingContainer loading={loading} size={40} />
      {event ? (
        <Grid container spacing={2}>
          <Grid item container md={9}>
            <Grid item container className={classes.card}>
              <EventDetailedHeader
                event={event}
                authenticated={authenticated}
                authUserId={user?.id}
                toggleAttendEvent={handleToggleEvent}
                loading={toggleLoading}
              />
            </Grid>
            <Grid item container className={classes.card}>
              <EventDetailedInfo event={event} />
            </Grid>
            <Grid item container className={classes.card}>
              {/* <EventDetailedChats
                eventId={event?.id}
                authenticated={authenticated}
                authUser={user}
              /> */}
            </Grid>
          </Grid>

          <Grid item container direction='column' justify='flex-start' md={3}>
            <EventDetailedSidebar
              attendees={event.attendees}
              authUserId={user?.id}
              host={event.host}
            />
          </Grid>
        </Grid>
      ) : (
        <EventDetailedSkeleton />
      )}
    </LayoutPage>
  );
}

export default EventDetailed;
