import React from 'react';
import PropTypes from 'prop-types';

import { DateTimePicker } from '@material-ui/pickers';

import { Controller } from 'react-hook-form';

DateInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  control: PropTypes.any,
  variant: PropTypes.string,
  fullWidth: PropTypes.bool,
};

DateInput.defaultProps = {
  variant: 'outlined',
  fullWidth: true,
};

function DateInput({ label, name, control, variant, fullWidth }) {
  return (
    <Controller
      as={
        <DateTimePicker
          margin='normal'
          label={label}
          fullWidth={fullWidth}
          inputVariant={variant}
          autoComplete='off'
          style={{ marginTop: 0 }}
          format='MMMM, dd yyyy'
        />
      }
      control={control}
      name={name}
    />
  );
}

export default DateInput;
