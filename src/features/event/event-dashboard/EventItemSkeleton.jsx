import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Skeleton from '@material-ui/lab/Skeleton';

EventItemSkeleton.propTypes = {
  event: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[2],
    border: `1px solid ${theme.palette.divider}`,
  },
  header: {
    alignItems: 'flex-start',
  },
  content: {
    '&:last-child': {
      paddingBottom: '16px !important',
    },
  },
  attendees: {
    backgroundColor: theme.palette.background.default,
  },
  button: {
    textTransform: 'unset',
  },
}));

function EventItemSkeleton({ event }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Skeleton variant='circle' animation='wave' width={80} height={80} />
        }
        title={
          <Skeleton
            animation='wave'
            width='70%'
            height={20}
            style={{ marginBottom: 8 }}
          />
        }
        subheader={
          <Skeleton
            animation='wave'
            width='30%'
            height={10}
            style={{ marginBottom: 8 }}
          />
        }
        className={classes.header}
      />
      <Divider />
      <CardContent className={classes.content}>
        <Grid container>
          <Skeleton animation='wave' width='80%' height={10} />
        </Grid>
      </CardContent>
      <Divider />
      <CardContent className={clsx(classes.content, classes.attendees)}>
        <AvatarGroup max={4}>
          <Skeleton variant='circle' animation='wave' width={32} height={32} />
        </AvatarGroup>
      </CardContent>

      <Divider />

      <CardContent className={classes.content}>
        <Grid container spacing={1}>
          <Hidden xsDown>
            <Grid item container>
              <Skeleton
                animation='wave'
                height={10}
                width='80%'
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation='wave' height={10} width='60%' />
            </Grid>
          </Hidden>
          <Grid item container justify='flex-end'>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              disabled
            >
              View
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default EventItemSkeleton;
