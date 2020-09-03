import React from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';

import FilterListIcon from '@material-ui/icons/FilterList';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import { eventFilters } from 'app/utils/constants';

EventFilters.propTypes = {
  predicate: PropTypes.any,
  setPredicate: PropTypes.func,
  reset: PropTypes.func,
  loading: PropTypes.bool,
  authenticated: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  headerIcon: {
    minWidth: 'unset',
    marginRight: theme.spacing(2),
  },
  headerText: {
    fontWeight: 500,
  },
}));

const { EVENT_ALL, EVENT_HOST, EVENT_GOING, EVENT_DATE } = eventFilters;

function EventFilters({
  predicate,
  setPredicate,
  reset,
  loading,
  authenticated,
  refetch,
}) {
  const classes = useStyles();

  const handleFilter = (type, value) => {
    setPredicate(type, value);
    reset();
  };

  const handleItemClick = (filterType, startDate) => {
    const newPredicate = {};

    newPredicate.filter = filterType;
    newPredicate.date = startDate
      ? { startDate }
      : { startDate: predicate.date.startDate };

    setPredicate(newPredicate);
    // if (filterType === EVENT_DATE) {
    //   refetch({ filterType, startDate });
    // } else {
    //   refetch({ filterType });
    // }
  };

  return (
    <Grid container direction='column'>
      <Grid item container>
        {authenticated && (
          <Paper className={classes.paper}>
            <List style={{ paddingTop: 0 }}>
              <ListItem divider>
                <ListItemIcon className={classes.headerIcon}>
                  <FilterListIcon color='primary' />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    variant='body1'
                    color='primary'
                    className={classes.headerText}
                  >
                    Filters
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem
                button
                disabled={loading}
                selected={predicate.filter === EVENT_ALL}
                onClick={() => handleItemClick(EVENT_ALL)}
              >
                <ListItemText>All Events</ListItemText>
              </ListItem>
              <ListItem
                button
                disabled={loading}
                selected={predicate.filter === EVENT_GOING}
                onClick={() => handleItemClick(EVENT_GOING)}
              >
                <ListItemText>I'm going</ListItemText>
              </ListItem>
              <ListItem
                button
                disabled={loading}
                selected={predicate.filter === EVENT_HOST}
                onClick={() => handleItemClick(EVENT_HOST)}
              >
                <ListItemText>I'm hosting</ListItemText>
              </ListItem>
            </List>
          </Paper>
        )}
      </Grid>
      <Grid item container>
        <Paper className={classes.paper}>
          <List style={{ padding: 0 }}>
            <ListItem divider>
              <ListItemIcon className={classes.headerIcon}>
                <CalendarTodayIcon color='primary' />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant='body1'
                  color='primary'
                  className={classes.headerText}
                >
                  Select Date
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem disableGutters style={{ padding: 0 }}>
              <Calendar
                onChange={date => handleItemClick(EVENT_DATE, date)}
                value={predicate.date.startDate}
                tileDisabled={() => loading}
              />
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default EventFilters;
