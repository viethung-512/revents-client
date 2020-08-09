import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  footer: {
    borderTopWidth: 1,
    borderTopColor: theme.palette.divider,
    borderTopStyle: 'solid',
    padding: theme.spacing(1),
  },
}));

function Footer(props) {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container alignItems='center' justify='center'>
        <Typography variant='caption' align='center'>
          @template-2020
        </Typography>
      </Grid>
    </footer>
  );
}

export default Footer;
