import React, { Fragment, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

DropDown.propTypes = {
  content: PropTypes.node.isRequired,
  menuItems: PropTypes.array.isRequired,
};

const useStyles = makeStyles(theme => ({
  item: {
    '& .MuiListItemIcon-root': {
      minWidth: 'unset',
      marginRight: theme.spacing(2),
    },
  },
}));

function DropDown({ content, menuItems }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleItemClick = (event, callback) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
    if (callback) {
      callback();
    }
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <Fragment>
      <div
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
      >
        {content}
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='menu-list-grow'
                  onKeyDown={handleListKeyDown}
                  style={{ padding: 0 }}
                >
                  {menuItems.map(item =>
                    item.path ? (
                      <MenuItem
                        onClick={e => handleItemClick(e, item.callback)}
                        key={item.id}
                        className={classes.item}
                        component={Link}
                        to={item.path}
                        divider={item.borderBottom}
                      >
                        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                        <ListItemText>{item.label}</ListItemText>
                      </MenuItem>
                    ) : (
                      <MenuItem
                        onClick={e => handleItemClick(e, item.callback)}
                        key={item.id}
                        className={classes.item}
                        divider={item.borderBottom}
                      >
                        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                        <ListItemText>{item.label}</ListItemText>
                      </MenuItem>
                    )
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
}

export default DropDown;
