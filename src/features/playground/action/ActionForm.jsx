import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Input from 'app/layout/commons/form/Input';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
  },
  formItem: {
    marginBottom: theme.spacing(2),
  },
}));

export default function ActionForm({ submitForm, control }) {
  const classes = useStyles();
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <form className={classes.form} onSubmit={submitForm}>
      <Grid container direction='column'>
        <Grid item className={classes.formItem}>
          <Input control={control} name='test' label='Test Input' />
        </Grid>
        <Grid item className={classes.formItem}>
          <Button
            variant='contained'
            fullWidth={matchesXS}
            type='submit'
            color='primary'
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
