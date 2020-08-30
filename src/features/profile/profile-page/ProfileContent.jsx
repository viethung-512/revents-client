import React from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import AboutTab from './AboutTab';
import PhotosTab from './PhotosTab';
import EventsTab from './EventsTab';
import FollowTab from './FollowTab';
import {
  PROFILE_GET_PHOTOS,
  PROFILE_GET_FOLLOWERS,
  PROFILE_GET_FOLLOWINGS,
} from '../graphql/profileQuery';

ProfileContent.propTypes = {
  profile: PropTypes.object,
  isAuthUser: PropTypes.bool,
  userId: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    padding: theme.spacing(2),
    boxShadow: theme.shadows[4],
  },
  paper: {
    width: '100%',
    boxShadow: theme.shadows[4],
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabsIndicator: {
    display: 'none',
  },
  tab: {
    maxWidth: 'unset',
    [theme.breakpoints.down('xs')]: {
      minWidth: '8em',
    },
  },
  tabWrapper: {
    alignItems: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
    },
  },
  tabTextColorInherit: {
    opacity: 1,
  },
  tabSelected: {
    backgroundColor: theme.palette.grey[100],
  },
}));

function ProfileContent({ profile, isAuthUser, userId, value, setValue }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const [
    getPhotos,
    { loading: getPhotosLoading, data: getPhotosResult },
  ] = useLazyQuery(PROFILE_GET_PHOTOS);
  const [
    getFollowers,
    { loading: getFollowersLoading, data: getFollowersResult },
  ] = useLazyQuery(PROFILE_GET_FOLLOWERS);
  const [
    getFollowings,
    { loading: getFollowingsLoading, data: getFollowingsResult },
  ] = useLazyQuery(PROFILE_GET_FOLLOWINGS);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleGetPhotos = () => getPhotos({ variables: { id: userId } });

  const handleGetFollowers = () => getFollowers({ variables: { id: userId } });

  const handleGetFollowings = () =>
    getFollowings({ variables: { id: userId } });

  const photos = getPhotosResult ? getPhotosResult.getUser.photos : [];

  const followers = getFollowersResult
    ? getFollowersResult.getUser.followers
    : [];
  const followings = getFollowingsResult
    ? getFollowingsResult.getUser.followings
    : [];

  return (
    <Grid
      container
      direction={matchesXS ? 'column-reverse' : 'row'}
      spacing={2}
    >
      <Grid item container sm={9}>
        <Paper className={classes.paper}>
          <AboutTab
            profile={profile}
            isAuthUser={isAuthUser}
            value={value}
            userId={userId}
          />

          <PhotosTab
            profile={profile}
            isAuthUser={isAuthUser}
            userId={userId}
            value={value}
            loading={getPhotosLoading}
            photos={photos}
          />
          <EventsTab value={value} profile={profile} userId={userId} />
          <FollowTab
            profiles={profile?.followers ?? []}
            title='Follower'
            value={value}
            index={3}
            isFollowingTab={false}
            loading={getFollowersLoading}
            follows={followers}
          />
          <FollowTab
            profiles={profile?.followings ?? []}
            title='Following'
            value={value}
            index={4}
            isFollowingTab={true}
            loading={getFollowingsLoading}
            follows={followings}
          />
        </Paper>
      </Grid>
      <Grid item container direction='column' sm={3}>
        <Grid item container>
          <Paper style={{ width: '100%' }}>
            <Tabs
              orientation={matchesXS ? 'horizontal' : 'vertical'}
              variant='scrollable'
              value={value}
              onChange={handleChange}
              className={classes.tabs}
              classes={{
                indicator: classes.tabsIndicator,
              }}
            >
              <Tab
                className={classes.tab}
                classes={{
                  wrapper: classes.tabWrapper,
                  textColorInherit: classes.tabTextColorInherit,
                  selected: classes.tabSelected,
                }}
                label='About'
              />
              <Tab
                className={classes.tab}
                classes={{
                  wrapper: classes.tabWrapper,
                  textColorInherit: classes.tabTextColorInherit,
                  selected: classes.tabSelected,
                }}
                label='Photos'
                onClick={handleGetPhotos}
              />
              <Tab
                className={classes.tab}
                classes={{
                  wrapper: classes.tabWrapper,
                  textColorInherit: classes.tabTextColorInherit,
                  selected: classes.tabSelected,
                }}
                label='Events'
              />
              <Tab
                className={classes.tab}
                classes={{
                  wrapper: classes.tabWrapper,
                  textColorInherit: classes.tabTextColorInherit,
                  selected: classes.tabSelected,
                }}
                label='Follower'
                onClick={handleGetFollowers}
              />
              <Tab
                className={classes.tab}
                classes={{
                  wrapper: classes.tabWrapper,
                  textColorInherit: classes.tabTextColorInherit,
                  selected: classes.tabSelected,
                }}
                label='Following'
                onClick={handleGetFollowings}
              />
            </Tabs>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileContent;
