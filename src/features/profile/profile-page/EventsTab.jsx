import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import EventIcon from '@material-ui/icons/Event';

import TabPanel from './TabPanel';
import useAlert from 'hooks/useAlert';
import EventItem from 'features/event/commons/EventItem';
import { EVENT_FETCH_LIST } from 'features/event/graphql/eventQuery';

EventsTab.propTypes = {
  profile: PropTypes.object,
  isAuthUser: PropTypes.bool,
  value: PropTypes.number,
};

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2),
  },
  tag: {
    border: 'none',
  },
  tagIcon: {
    marginLeft: '0 !important',
    width: 40,
    height: 40,
  },
  tab: {
    textTransform: 'unset',
  },
}));

const EventItemWrapper = ({ children }) => (
  <Grid item container justify='center' xs={6} sm={4} md={3} lg={2}>
    {children}
  </Grid>
);

function EventsTab({ isAuthUser, userId, value }) {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [events, setEvents] = useState([]);
  const [variables, setVariables] = useState({
    filterType: 'EVENT_FUTURE',
    userId,
  });
  const { alertError } = useAlert();

  const [getEvents, { loading }] = useLazyQuery(EVENT_FETCH_LIST, {
    onError: err => {
      console.log(err);
      alertError('Something went wrong, please try again.');
    },
    onCompleted: data => setEvents(data.getEvents),
  });

  useEffect(() => {
    getEvents({ variables });
  }, [getEvents, variables]);

  const handleChangeTab = (_, newValue) => {
    setTabValue(newValue);
    switch (newValue) {
      case 0:
        setVariables({ ...variables, filterType: 'EVENT_FUTURE' });
        break;
      case 1:
        setVariables({ ...variables, filterType: 'EVENT_PASS' });
        break;
      case 2:
        setVariables({ ...variables, filterType: 'EVENT_HOST' });
        break;
      default:
        setVariables({ ...variables, filterType: 'EVENT_FUTURE' });
        break;
    }
  };

  const renderEvents = (
    <Grid container className={classes.card} spacing={2}>
      {events.length > 0 ? (
        events.map(event => (
          <EventItemWrapper key={event.id}>
            <EventItem event={event} />
          </EventItemWrapper>
        ))
      ) : (
        <Typography variant='body1'>
          {isAuthUser
            ? "You don't have any events"
            : 'Can not find any events at the moment.'}
        </Typography>
      )}
    </Grid>
  );

  return (
    <TabPanel value={value} index={2}>
      <Grid item container direction='column'>
        <Grid
          item
          container
          justify='space-between'
          alignItems='center'
          className={classes.card}
        >
          <Grid item>
            <Chip
              className={classes.tag}
              classes={{
                icon: classes.tagIcon,
              }}
              icon={<EventIcon fontSize='large' />}
              label={<Typography variant='h6'>Events</Typography>}
              variant='outlined'
            />
          </Grid>
        </Grid>
        <Divider />
        <Grid item container direction='column'>
          <Grid item container>
            <AppBar position='static' color='default'>
              <Tabs
                value={tabValue}
                onChange={handleChangeTab}
                indicatorColor='primary'
                textColor='primary'
                variant='scrollable'
                scrollButtons='auto'
              >
                <Tab className={classes.tab} label='Future Events' />
                <Tab className={classes.tab} label='Past Events' />
                <Tab className={classes.tab} label='Hosting' />
              </Tabs>
            </AppBar>
          </Grid>
          <Grid item container className={classes.cardContent}>
            <TabPanel value={tabValue} index={0} loading={loading}>
              {renderEvents}
            </TabPanel>
            <TabPanel value={tabValue} index={1} loading={loading}>
              {renderEvents}
            </TabPanel>
            <TabPanel value={tabValue} index={2} loading={loading}>
              {renderEvents}
            </TabPanel>
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  );
}

export default EventsTab;
