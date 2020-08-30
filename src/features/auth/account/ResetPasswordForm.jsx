import React from 'react';
import PropTypes from 'prop-types';
import Input from 'app/layout/commons/form/Input';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Spinner from 'app/layout/commons/async/Spinner';

ResetPasswordForm.propTypes = {
  control: PropTypes.any,
  errors: PropTypes.object,
  isValid: PropTypes.bool,
  loading: PropTypes.bool,
  submitForm: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
  },
  formItem: {
    marginBottom: theme.spacing(3),
  },
  updatePasswordButton: {
    textTransform: 'unset',
    width: '13em',
    color: '#fff',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

function ResetPasswordForm({ control, errors, isValid, loading, submitForm }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <form className={classes.form} onSubmit={submitForm}>
      <Grid container direction='column'>
        <Grid item className={classes.formItem}>
          <Input
            control={control}
            name='password'
            label='Password'
            error={errors.password}
            type='password'
          />
        </Grid>
        <Grid item className={classes.formItem}>
          <Input
            control={control}
            name='confirmPassword'
            error={errors.confirmPassword}
            label='Confirm Password'
            type='password'
          />
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            className={classes.updatePasswordButton}
            disabled={!isValid || loading}
            size='large'
            type='submit'
          >
            {loading ? (
              <Spinner color={theme.palette.success.dark} />
            ) : (
              'Update Password'
            )}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default ResetPasswordForm;
