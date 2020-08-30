import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useMutation } from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { getDate } from 'app/utils/helper';
import { profileFormValidator } from 'app/utils/validators';
import ProfileForm from './ProfileForm';
import TabPanel from './TabPanel';
import useAlert from 'hooks/useAlert';
import { setAuth } from 'features/auth/authSlice';
import { AUTH_UPDATE_USER } from 'features/auth/graphql/authMutation';
import { PROFILE_GET_USER } from '../graphql/profileQuery';

AboutTab.propTypes = {
  profile: PropTypes.object,
  isAuthUser: PropTypes.bool,
  value: PropTypes.number,
  userId: PropTypes.string,
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
  extraButton: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
    },
  },
}));

const defaultValues = {
  username: '',
  description: '',
};

function AboutTab({ profile, isAuthUser, value, userId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { user } = useSelector(state => state.auth);
  const { handleSubmit, reset, control, errors, formState } = useForm({
    mode: 'onChange',
    resolver: yupResolver(profileFormValidator),
    defaultValues,
  });

  const { alertSuccess, alertError } = useAlert();
  const [updateUserInfo, { loading }] = useMutation(AUTH_UPDATE_USER, {
    onError: err => {
      alertError(err.graphQLErrors[0].message);
    },
    update: (proxy, { data }) => {
      const cache = proxy.readQuery({
        query: PROFILE_GET_USER,
        variables: { id: userId },
      });

      const newUser = {
        ...cache.getUser,
        username: data.updateUser.username ?? cache.getUser.username,
        description: data.updateUser.description ?? cache.getUser.description,
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
    onCompleted: data => {
      alertSuccess('Update user info success');
      if (data.updateUser.username) {
        dispatch(setAuth({ ...user, username: data.updateUser.username }));
      }
      setEditMode(false);
    },
  });

  useEffect(() => {
    if (profile && profile.id) {
      const formData = {
        ...profile,
        description: profile.description ? profile.description : '',
      };
      reset(formData);
    }

    return () => {
      reset(defaultValues);
    };
  }, [profile, reset]);

  const submitForm = values => {
    updateUserInfo({ variables: values });
  };

  return (
    <TabPanel value={value} index={0}>
      <Grid container direction='column'>
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
              label={
                <Typography variant='h6'>About {profile.username}</Typography>
              }
              variant='outlined'
            />
          </Grid>
          {isAuthUser && (
            <Grid item>
              <Button
                variant='outlined'
                onClick={() => setEditMode(!editMode)}
                size='small'
                className={classes.extraButton}
              >
                {editMode ? 'Cancel' : 'Edit'}
              </Button>
            </Grid>
          )}
        </Grid>
        <Divider />
        <Grid item container className={classes.card}>
          {editMode && isAuthUser && (
            <ProfileForm
              submitForm={handleSubmit(submitForm)}
              control={control}
              isValid={formState.isValid}
              loading={loading}
              errors={errors}
            />
          )}
          {!editMode && (
            <Grid item container direction='column'>
              <Grid item container alignItems='center'>
                <Grid item style={{ marginRight: 8 }}>
                  <Typography variant='body1'>Member since: </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body1' color='textSecondary'>
                    {profile.createdAt && getDate(profile.createdAt, false)}
                  </Typography>
                </Grid>
              </Grid>
              {profile.description && (
                <Grid item>
                  <Typography variant='body2'>{profile.description}</Typography>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </TabPanel>
  );
}

export default AboutTab;
