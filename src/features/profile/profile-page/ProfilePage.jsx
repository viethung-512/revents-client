import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';

import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import LayoutPage from 'app/layout/pages/LayoutPage';
import Header from './ProfileHeader';
import Content from './ProfileContent';
import LoadingContainer from 'app/layout/commons/async/LoadingContainer';
import useAlert from 'hooks/useAlert';
import { PROFILE_GET_USER } from '../graphql/profileQuery';

function ProfilePage({ match, history }) {
  const userId = match.params.id;
  const [followed, setFollowed] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { user, authenticated } = useSelector(state => state.auth);
  const theme = useTheme();
  const { alertError } = useAlert();
  const { loading, data, refetch } = useQuery(PROFILE_GET_USER, {
    variables: { id: userId },
    onError: err => {
      history.push('/not-found');
      alertError(err.graphQLErrors[0].message);
    },
    onCompleted: data => {
      if (data.getUser.followers.some(fl => fl.id === user.id)) {
        setFollowed(true);
      } else {
        setFollowed(false);
      }
    },
  });

  useEffect(() => {
    /**
     * userId: userId normal
     * user.id: authenticated user id
     */
    if (user && userId === user.id) {
      refetch({ id: user.id });
    }
    return () => setTabValue(0);
  }, [userId, refetch, user]);

  const profile = data ? data.getUser : {};
  const isAuthUser = user && userId === user.id;

  return (
    <LayoutPage>
      <LoadingContainer loading={loading} />
      {/* {!loading && userId && !profile && <Redirect to='/not-found' />} */}
      <Grid container direction='column'>
        <Grid item container style={{ marginBottom: theme.spacing(2) }}>
          <Header
            isAuthUser={isAuthUser}
            profile={profile}
            followed={followed}
            setFollowed={setFollowed}
            authenticated={authenticated}
            userId={userId}
          />
        </Grid>
        <Grid item container>
          <Content
            isAuthUser={isAuthUser}
            profile={profile}
            userId={userId}
            value={tabValue}
            setValue={setTabValue}
          />
        </Grid>
      </Grid>
    </LayoutPage>
  );
}

export default ProfilePage;
