import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Input from 'app/layout/commons/form/Input';
import Spinner from 'app/layout/commons/async/Spinner';

RegisterForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  control: PropTypes.any.isRequired,
  errors: PropTypes.object,
  loading: PropTypes.bool,
  isValid: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
  },
  formItem: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    '&:first-child': {
      marginTop: theme.spacing(1),
    },
    '&:last-child': {
      marginBottom: theme.spacing(1),
    },
  },
}));

function RegisterForm({ submitForm, control, errors, loading, isValid }) {
  const classes = useStyles();

  return (
    <form onSubmit={submitForm} className={classes.form}>
      <Grid container direction='column'>
        <Grid item className={classes.formItem}>
          <Input
            name='email'
            label='Email'
            control={control}
            error={errors.email}
          />
        </Grid>
        <Grid item className={classes.formItem}>
          <Input
            name='username'
            label='Know As'
            control={control}
            error={errors.username}
          />
        </Grid>
        <Grid item className={classes.formItem}>
          <Input
            name='password'
            label='Password'
            control={control}
            error={errors.password}
            type='password'
          />
        </Grid>
        <Grid item className={classes.formItem}>
          <Input
            name='confirmPassword'
            label='Confirm Password'
            control={control}
            error={errors.confirmPassword}
            type='password'
          />
        </Grid>
        <Grid item className={classes.formItem}>
          {errors.general && (
            <Typography variant='body1' color='error' align='center'>
              {errors.general.message}
            </Typography>
          )}
        </Grid>
        <Grid item className={classes.formItem}>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            disabled={loading || !isValid}
            size='large'
            type='submit'
          >
            {loading ? <Spinner /> : 'Register'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default RegisterForm;
