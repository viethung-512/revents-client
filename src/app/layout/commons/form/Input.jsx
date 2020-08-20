import React from 'react';
import PropTypes from 'prop-types';

import { Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';

Input.propTypes = {
  control: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  variant: PropTypes.string,
};

Input.defaultProps = {
  variant: 'outlined',
};

export default function Input({ control, name, label, variant }) {
  return (
    <Controller
      as={<TextField label={label} fullWidth variant={variant} />}
      control={control}
      name={name}
    />
  );
}
