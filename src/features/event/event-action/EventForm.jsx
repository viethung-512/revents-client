import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import Input from 'app/layout/commons/form/Input';
import DateInput from 'app/layout/commons/form/DateInput';
import Spinner from 'app/layout/commons/async/Spinner';

EventForm.propTypes = {
  control: PropTypes.any,
  submitForm: PropTypes.func,
  errors: PropTypes.object,
  loading: PropTypes.bool,
  isValid: PropTypes.bool,
  isEditEvent: PropTypes.bool,
  isCancelled: PropTypes.bool,
  cancelToggleEvent: PropTypes.func,
  cancelToggleLoading: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
  },
  formItem: {
    marginBottom: theme.spacing(3),
  },
  option: {
    padding: theme.spacing(1),
  },
  button: {
    width: '11em',
    textTransform: 'unset',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  successButton: {
    ...theme.custom.successButton.contained,
  },
  errorButton: {
    ...theme.custom.errorButton.contained,
  },
  cancelButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2),
      marginRight: 0,
    },
  },
}));

function EventForm({
  control,
  submitForm,
  errors,
  categories,
  loading,
  isValid,
  isEditEvent,
  isCancelled,
  cancelToggleEvent,
  cancelToggleLoading,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <form onSubmit={submitForm} className={classes.form}>
      <Grid container direction='column'>
        <Grid item container>
          <Typography
            variant='h6'
            gutterBottom
            color='primary'
            style={{ textTransform: 'uppercase' }}
          >
            Event Detail
          </Typography>
        </Grid>
        <Grid item container className={classes.formItem}>
          <Input
            name='title'
            label='Event Title'
            control={control}
            error={errors.title}
          />
        </Grid>
        <Grid item container className={classes.formItem}>
          <Input
            name='category'
            label='Category'
            control={control}
            error={errors.title}
            select
          >
            {categories.map(category => (
              <MenuItem
                key={category.key}
                value={category.value}
                className={classes.option}
              >
                {category.text}
              </MenuItem>
            ))}
          </Input>
        </Grid>
        <Grid item container className={classes.formItem}>
          <Input
            name='description'
            label='Description'
            control={control}
            error={errors.description}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item container>
          <Typography
            variant='h6'
            gutterBottom
            color='primary'
            style={{ textTransform: 'uppercase' }}
          >
            Event Location Detail
          </Typography>
        </Grid>
        <Grid item container className={classes.formItem}>
          <Input
            name='city'
            label='Event City'
            control={control}
            error={errors.city}
          />
        </Grid>
        <Grid item container className={classes.formItem}>
          <Input
            name='venue'
            label='Venue'
            control={control}
            error={errors.venue}
          />
        </Grid>
        <Grid item container className={classes.formItem}>
          <DateInput
            name='date'
            label='Date'
            control={control}
            error={errors.date}
          />
        </Grid>
        <Grid
          item
          container
          justify='space-between'
          className={classes.formItem}
          spacing={2}
        >
          <Grid item container={matchesXS}>
            {isEditEvent && (
              <Button
                variant='contained'
                color='primary'
                className={clsx(
                  isCancelled ? classes.successButton : classes.errorButton,
                  classes.button
                )}
                disabled={cancelToggleLoading}
                fullWidth
                size='large'
                onClick={cancelToggleEvent}
              >
                {cancelToggleLoading ? (
                  <Spinner />
                ) : isCancelled ? (
                  'ReActive Event'
                ) : (
                  'Cancel Event'
                )}
              </Button>
            )}
          </Grid>

          <Grid item container={matchesXS}>
            <Button
              variant='contained'
              disabled={loading}
              fullWidth
              className={clsx(classes.cancelButton, classes.button)}
              size='large'
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={clsx(classes.successButton, classes.button)}
              type='submit'
              disabled={loading || !isValid}
              fullWidth
              size='large'
            >
              {loading ? (
                <Spinner />
              ) : isEditEvent ? (
                'Update Event'
              ) : (
                'Create Event'
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default EventForm;
