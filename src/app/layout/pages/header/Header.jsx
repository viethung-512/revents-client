import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ElevationScroll from '../../commons/ElevationScroll';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import AddIcon from '@material-ui/icons/Add';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import useModal from 'hooks/useModal';
import DropDown from 'app/layout/commons/DropDown';
import { setUnAuth } from 'features/auth/authSlice';
// import { useMediaQuery } from '@material-ui/core';
import DefaultAvatar from 'app/layout/commons/DefaultAvatar';
import useDrawer from 'hooks/useDrawer';

const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.divider,
    borderBottomStyle: 'solid',
    backgroundImage:
      'linear-gradient(135deg, rgb(24, 42, 115) 0%, rgb(33, 138, 174) 69%, rgb(32, 167, 172) 89%) !important',
  },
  tabs: {
    color: '#fff',
    '& .MuiTabs-indicator': {
      display: 'none',
    },
    '& .MuiTab-fullWidth': {
      flexBasis: 'unset',
    },
    '& .MuiTab-root': {
      minWidth: 'unset',
    },
  },
  logoWrapper: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  headerItem: {
    color: '#fff',
    textTransform: 'unset',
    fontSize: '1rem',
    fontWeight: 400,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    opacity: 1,
  },
  logo: {
    height: '3em',
  },
  createEventButton: {
    ...theme.custom.successButton.contained,
    borderWidth: '3px !important',
    width: '9.5em !important',
  },
  button: {
    border: '2px solid #fff',
    borderRadius: 6,
  },
}));

function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const { authenticated, user } = useSelector(state => state.auth);

  const { openModal } = useModal();
  const { openDrawer } = useDrawer();

  // const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChangeTab = (e, newTab) => setTabValue(newTab);

  const menuItems = [
    {
      id: 'create-event',
      label: 'Create Event',
      icon: <AddIcon />,
      path: '/create-event',
      callback: () => {},
      borderBottom: false,
    },
    {
      id: 'my-profile',
      label: 'My Profile',
      icon: <AccountBoxIcon />,
      path: `/profile/${user?.id}`,
      callback: () => {},
      borderBottom: false,
    },
    {
      id: 'my-account',
      label: 'My Account',
      icon: <SettingsApplicationsIcon />,
      path: '/my-account',
      callback: () => {},
      borderBottom: true,
    },
    {
      id: 'sign-out',
      label: 'Sign Out',
      icon: <PowerSettingsNewIcon />,
      path: '/',
      callback: () => dispatch(setUnAuth()),
      borderBottom: false,
    },
  ];

  const unAuthMenuItems = [
    {
      id: 'login',
      label: 'Login',
      callback: () => openModal('LoginModal'),
      borderBottom: true,
    },
    {
      id: 'register',
      label: 'Register',
      callback: () => openModal('RegisterModal'),
      borderBottom: false,
    },
  ];

  const unAuthMenu = (
    <Grid container alignItems='center'>
      <Hidden mdUp>
        <DropDown
          content={
            <IconButton>
              <AccountCircleIcon fontSize='large' style={{ color: '#fff' }} />
            </IconButton>
          }
          menuItems={unAuthMenuItems}
        />
      </Hidden>
      <Hidden smDown>
        <Grid item>
          <Button
            variant='outlined'
            className={clsx(classes.headerItem, classes.button)}
            onClick={() => openModal('LoginModal')}
          >
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant='outlined'
            className={clsx(classes.headerItem, classes.button)}
            style={{ marginRight: 0 }}
            onClick={() => openModal('RegisterModal')}
          >
            Register
          </Button>
        </Grid>
      </Hidden>
    </Grid>
  );

  const authMenu = (
    <Grid container alignItems='center'>
      <Grid item>
        <DropDown
          content={
            <Fragment>
              <Hidden mdUp>
                <List style={{ padding: 0 }}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar alt='avatar' src={user?.photoURL}>
                        <DefaultAvatar />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      className={classes.headerItem}
                      style={{ margin: 0 }}
                    >
                      {user?.username}
                    </ListItemText>
                  </ListItem>
                </List>
              </Hidden>

              <Hidden smDown>
                <List style={{ padding: 0 }}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar alt='avatar' src={user?.photoURL}>
                        <DefaultAvatar />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      className={classes.headerItem}
                      style={{ margin: 0 }}
                    >
                      {user?.username}
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <ArrowDropDownIcon style={{ color: '#fff' }} />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Hidden>
            </Fragment>
          }
          menuItems={menuItems}
        />
      </Grid>
    </Grid>
  );

  return (
    <ElevationScroll>
      <AppBar color='inherit' className={classes.appBar}>
        <Toolbar disableGutters>
          <Container>
            <Grid container justify='space-between' alignItems='center'>
              <Grid item>
                <Grid container alignItems='center'>
                  <Hidden mdUp>
                    <Grid item>
                      <IconButton
                        onClick={() => openDrawer('MenuMobileDrawer')}
                      >
                        <MenuIcon fontSize='large' style={{ color: '#fff' }} />
                      </IconButton>
                    </Grid>
                  </Hidden>
                  <Grid item className={classes.logoWrapper}>
                    <Grid container alignItems='center' component={Link} to='/'>
                      {/* <Grid item> */}
                      <Hidden xsDown>
                        <img
                          alt='logo'
                          src='/assets/logo.png'
                          className={classes.logo}
                        />
                      </Hidden>
                      <Grid item>
                        <Typography
                          variant='body1'
                          className={classes.headerItem}
                        >
                          Revents
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Hidden smDown>
                      <Tabs
                        variant='fullWidth'
                        value={tabValue}
                        onChange={handleChangeTab}
                        className={classes.tabs}
                      >
                        <Tab
                          label='Events'
                          component={Link}
                          to='/events'
                          className={classes.headerItem}
                          style={{
                            borderLeft: `1px solid ${theme.palette.grey[500]}`,
                            borderRight: `1px solid ${theme.palette.grey[500]}`,
                          }}
                        />
                        {authenticated && (
                          <Tab
                            label='Create Event'
                            component={Link}
                            to='/create-event'
                            className={clsx(
                              classes.headerItem,
                              classes.button,
                              classes.createEventButton
                            )}
                          />
                        )}
                      </Tabs>
                    </Hidden>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>{authenticated ? authMenu : unAuthMenu}</Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
}

export default Header;
