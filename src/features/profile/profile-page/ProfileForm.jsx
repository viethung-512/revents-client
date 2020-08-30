import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Input from 'app/layout/commons/form/Input';
import Spinner from 'app/layout/commons/async/Spinner';

ProfileForm.propTypes = {
  submitForm: PropTypes.func,
  loading: PropTypes.bool,
  isValid: PropTypes.bool,
  control: PropTypes.any.isRequired,
  errors: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
  },
  formItem: {
    marginBottom: theme.spacing(2),
  },
  updateProfileButton: {
    width: '8em',
    textTransform: 'unset',
    color: '#fff',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

function ProfileForm({ submitForm, loading, isValid, control, errors }) {
  const classes = useStyles();

  return (
    <form onSubmit={submitForm} className={classes.form}>
      <Grid container direction='column'>
        <Grid item className={classes.formItem}>
          <Input
            name='username'
            label='Username'
            control={control}
            error={errors.username}
          />
        </Grid>
        <Grid item className={classes.formItem}>
          <Input
            name='description'
            label='Description'
            control={control}
            error={errors.description}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item container justify='flex-end'>
          <Button
            variant='contained'
            color='primary'
            disabled={!isValid || loading}
            type='submit'
            className={classes.updateProfileButton}
          >
            {loading ? <Spinner /> : 'UpdateProfile'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default ProfileForm;
