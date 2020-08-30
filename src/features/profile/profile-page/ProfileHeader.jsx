import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useAlert from 'hooks/useAlert';
import Spinner from 'app/layout/commons/async/Spinner';
import DefaultAvatar from 'app/layout/commons/DefaultAvatar';
import { PROFILE_TOGGLE_FOLLOW } from '../graphql/profileMutation';
import { PROFILE_GET_USER } from '../graphql/profileQuery';

ProfileHeader.propTypes = {
  profile: PropTypes.object,
  isAuthUser: PropTypes.bool,
  followed: PropTypes.bool,
  authenticated: PropTypes.bool,
  userId: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    padding: theme.spacing(2),
    boxShadow: theme.shadows[4],
  },
  avatar: {
    width: '7em',
    height: '7em',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      marginBottom: theme.spacing(0.5),
    },
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  followButton: {
    color: `${theme.palette.success.main} !important`,
    borderColor: `${theme.palette.success.main} !important`,
  },
  unFollowButton: {
    color: `${theme.palette.error.main} !important`,
    borderColor: `${theme.palette.error.main} !important`,
  },
}));

function ProfileHeader({
  profile,
  isAuthUser,
  followed,
  setFollowed,
  authenticated,
  userId,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [visited, setVisited] = useState(false);
  const { alertError } = useAlert();

  const [toggleFollowUser, { loading }] = useMutation(PROFILE_TOGGLE_FOLLOW, {
    onError: err => {
      console.log(err);
      alertError('Something went wrong, please try again.');
    },
    update: (proxy, { data: { toggleFollowUser } }) => {
      const {
        followerCount,
        followingCount,
        followers,
        followings,
      } = toggleFollowUser;
      const cache = proxy.readQuery({
        query: PROFILE_GET_USER,
        variables: { id: userId },
      });
      const newUser = {
        ...cache.getUser,
        followerCount,
        followingCount,
        followers,
        followings,
      };

      proxy.writeQuery({
        query: PROFILE_GET_USER,
        variables: { id: userId },
        data: {
          ...cache,
          getUser: newUser,
        },
      });
    },
    onCompleted: data => setFollowed(!followed),
  });

  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const handleToggleFollowUser = () => {
    toggleFollowUser({ variables: { userId } });
  };

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        direction={matchesSM ? 'column' : 'row'}
        justify='space-between'
        alignItems='center'
      >
        {/* left */}
        <Grid
          item
          container
          direction={matchesSM ? 'column' : 'row'}
          justify={matchesSM ? 'center' : 'flex-start'}
          alignItems='center'
          sm={9}
        >
          <Grid item>
            <Avatar
              alt='avatar'
              src={profile.photoURL}
              className={classes.avatar}
            >
              <DefaultAvatar />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant='h4' gutterBottom={matchesSM}>
              {profile.username}
            </Typography>
          </Grid>
        </Grid>

        {/* right */}
        <Grid item container sm={3} style={{ maxWidth: '15em' }}>
          <Grid container direction='column'>
            <Grid item container>
              <Grid item container direction='column' alignItems='center' xs>
                <Grid item>
                  <Typography variant='h3'>{profile.followerCount}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body1'>Follower</Typography>
                </Grid>
              </Grid>
              <Grid item container direction='column' alignItems='center' xs>
                <Grid item>
                  <Typography variant='h3'>{profile.followingCount}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body1'>Following</Typography>
                </Grid>
              </Grid>
            </Grid>
            {!isAuthUser && authenticated && (
              <Fragment>
                <Divider className={classes.divider} />
                <Grid item>
                  <Button
                    style={{ color: '#fff' }}
                    variant={visited ? 'outlined' : 'contained'}
                    color='primary'
                    fullWidth
                    className={
                      visited
                        ? followed
                          ? classes.unFollowButton
                          : classes.followButton
                        : null
                    }
                    onMouseEnter={() => setVisited(true)}
                    onMouseLeave={() => setVisited(false)}
                    onClick={handleToggleFollowUser}
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner
                        color={
                          followed
                            ? theme.palette.error.dark
                            : theme.palette.success.dark
                        }
                      />
                    ) : visited ? (
                      followed ? (
                        'UnFollow'
                      ) : (
                        'Follow'
                      )
                    ) : followed ? (
                      'Following'
                    ) : (
                      'Not Follow'
                    )}
                  </Button>
                </Grid>
              </Fragment>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProfileHeader;
