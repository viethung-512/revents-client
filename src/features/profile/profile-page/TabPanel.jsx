import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  loading: PropTypes.any.isRequired,
};

TabPanel.defaultProps = {
  loading: false,
};

export default function TabPanel(props) {
  const { children, value, index, loading, ...other } = props;

  return (
    <Grid container direction='column'>
      {loading && value === index && <LinearProgress />}
      <Grid item container role='tabpanel' hidden={value !== index} {...other}>
        {value === index && (
          <Grid item container>
            {children}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
