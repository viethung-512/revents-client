import React from 'react';
import PropTypes from 'prop-types';

import { Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

Input.propTypes = {
  control: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.object,
  label: PropTypes.string,
  variant: PropTypes.string,
};

Input.defaultProps = {
  variant: 'outlined',
};

const useStyles = makeStyles(theme => ({
  inputRoot: {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));

export default function Input({
  control,
  name,
  label,
  variant,
  error,
  ...rest
}) {
  const classes = useStyles();

  return (
    <Controller
      as={
        <TextField
          label={label}
          fullWidth
          variant={variant}
          autoComplete='off'
          className={classes.inputRoot}
          error={Boolean(error)}
          helperText={error ? error.message : null}
          {...rest}
        />
      }
      control={control}
      name={name}
    />
  );
}
