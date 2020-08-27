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

function EventFilters({
  predicate,
  setPredicate,
  reset,
  loading,
  authenticated,
}) {
  const classes = useStyles();

  const handleFilter = (type, value) => {
    setPredicate(type, value);
    reset();
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
                selected={predicate.get('filter') === 'all'}
                onClick={() => handleFilter('filter', 'all')}
              >
                <ListItemText>All Events</ListItemText>
              </ListItem>
              <ListItem
                button
                disabled={loading}
                selected={predicate.get('filter') === 'isGoing'}
                onClick={() => handleFilter('filter', 'isGoing')}
              >
                <ListItemText>I'm going</ListItemText>
              </ListItem>
              <ListItem
                button
                disabled={loading}
                selected={predicate.get('filter') === 'isHosting'}
                onClick={() => handleFilter('filter', 'isHosting')}
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
                onChange={date => handleFilter('start_date', date)}
                value={predicate.get('start_date') || new Date()}
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
