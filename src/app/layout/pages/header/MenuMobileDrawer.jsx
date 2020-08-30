import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import DrawerWrapper from '../../../cores/drawer/DrawerWrapper';
import useDrawer from 'hooks/useDrawer';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  textLink: {
    textDecoration: 'none',
  },
}));

function MenuMobileDrawer(props) {
  const classes = useStyles();
  const { closeDrawer } = useDrawer();

  const itemClick = () => closeDrawer();

  return (
    <DrawerWrapper drawerType='MenuMobileDrawer'>
      <Grid container direction='column' className={classes.root}>
        <List>
          <ListItem button onClick={itemClick} component={Link} to='/events'>
            <ListItemText>
              <Typography
                variant='body1'
                color='textPrimary'
                className={classes.textLink}
              >
                Events
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Grid>
    </DrawerWrapper>
  );
}

export default MenuMobileDrawer;
