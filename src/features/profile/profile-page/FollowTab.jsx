import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import TabPanel from './TabPanel';
import ProfileItem from '../commons/ProfileItem';

FollowTab.propTypes = {
  profiles: PropTypes.array,
  isAuthUser: PropTypes.bool,
  loading: PropTypes.bool,
  value: PropTypes.number,
  index: PropTypes.number,
  title: PropTypes.string,
  follows: PropTypes.array,
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

const ProfileItemWrapper = ({ children }) => (
  <Grid item container justify='center' xs={6} sm={4} md={3} lg={2}>
    {children}
  </Grid>
);

function FollowTab({
  value,
  isFollowingTab,
  profiles,
  index,
  title,
  loading,
  follows,
}) {
  const classes = useStyles();

  return (
    <TabPanel value={value} index={index} loading={loading}>
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
              icon={<AccountCircleIcon fontSize='large' />}
              label={<Typography variant='h6'>{title}</Typography>}
              variant='outlined'
            />
          </Grid>
        </Grid>
        <Divider />
        <Grid item container direction='column'>
          <Grid container className={classes.card} spacing={2}>
            {follows.length > 0 ? (
              follows.map(profile => (
                <ProfileItemWrapper key={profile.id}>
                  <ProfileItem profile={profile} />
                </ProfileItemWrapper>
              ))
            ) : (
              <Typography variant='body1'>
                {isFollowingTab
                  ? 'Can not find any following.'
                  : 'Can not find any follower.'}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  );
}

export default FollowTab;
