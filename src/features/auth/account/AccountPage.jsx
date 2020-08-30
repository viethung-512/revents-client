import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';

import { loadCSS } from 'fg-loadcss';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import FacebookIcon from '@material-ui/icons/Facebook';

import LayoutPage from 'app/layout/pages/LayoutPage';
import ResetPasswordForm from './ResetPasswordForm';
import { resetPasswordValidator } from 'app/utils/validators';

import useAlert from 'hooks/useAlert';
import { useHistory } from 'react-router-dom';
import { AUTH_UPDATE_PASSWORD } from '../graphql/authMutation';
import { setUnAuth } from '../authSlice';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  card: {
    padding: theme.spacing(2),
  },
  facebookButton: {
    ...theme.custom.facebookButton,
  },
  googleButton: {
    ...theme.custom.googleButton,
  },
}));

const defaultValues = {
  password: '',
  confirmPassword: '',
};

function AccountPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const { control, errors, formState, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(resetPasswordValidator),
    defaultValues,
  });
  const { alertSuccess, alertError } = useAlert();
  const [updatePassword, { loading }] = useMutation(AUTH_UPDATE_PASSWORD, {
    onError: err => {
      console.log(err);
      alertError('Something went wrong, please try again');
    },
    onCompleted: () => {
      alertSuccess(
        'Your password has been changed, now you can use new password to sign in'
      );
      history.push('/events');
      dispatch(setUnAuth());
    },
  });

  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
      document.querySelector('#font-awesome-css')
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  const onSubmit = ({ password }) =>
    updatePassword({ variables: { password } });

  const renderResetPassword = () => {
    let result;

    if (user && user.providerId) {
      switch (user.providerId) {
        case 'password':
          result = (
            <Grid item container direction='column' className={classes.card}>
              <Grid item>
                <Typography
                  variant='body1'
                  color='primary'
                  style={{ fontWeight: 500 }}
                >
                  CHANGE PASSWORD
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='body2' gutterBottom>
                  Use this form to change your password
                </Typography>
              </Grid>
              <Grid item>
                <ResetPasswordForm
                  control={control}
                  errors={errors}
                  loading={loading}
                  isValid={formState.isValid}
                  submitForm={handleSubmit(onSubmit)}
                />
              </Grid>
            </Grid>
          );
          break;
        case 'facebook.com':
          result = (
            <Grid item container direction='column' className={classes.card}>
              <Grid item>
                <Typography
                  variant='body1'
                  color='primary'
                  style={{ fontWeight: 500 }}
                >
                  FACEBOOK ACCOUNT
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='body2' gutterBottom>
                  Please visit facebook to update your account
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  className={classes.facebookButton}
                  startIcon={<FacebookIcon />}
                  size='large'
                >
                  Facebook
                </Button>
              </Grid>
            </Grid>
          );
          break;
        case 'google.com':
          result = (
            <Grid item container direction='column' className={classes.card}>
              <Grid item>
                <Typography
                  variant='body1'
                  color='primary'
                  style={{ fontWeight: 500 }}
                >
                  GOOGLE ACCOUNT
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='body2' gutterBottom>
                  Please visit Google to update your account
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  className={classes.googleButton}
                  size='large'
                  startIcon={
                    <Icon
                      className='fab fa-google-plus-g'
                      style={{ width: 28 }}
                    />
                  }
                >
                  Google
                </Button>
              </Grid>
            </Grid>
          );
          break;
        default:
          result = '';
          break;
      }
    } else {
      result = '';
    }

    return result;
  };

  return (
    <LayoutPage>
      <Grid container direction='column'>
        <Paper className={classes.root}>
          <Grid container direction='column'>
            <Grid item container className={classes.card}>
              <Typography variant='h4'>Account</Typography>
            </Grid>
            <Divider />

            {renderResetPassword()}
          </Grid>
        </Paper>
      </Grid>
    </LayoutPage>
  );
}

export default AccountPage;
