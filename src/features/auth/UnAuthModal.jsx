import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';

import useModal from 'hooks/useModal';
import ModalWrapper from 'app/cores/modal/ModalWrapper';

UnAuthModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  wrappedRoute: PropTypes.bool.isRequired,
};

UnAuthModal.defaultProps = {
  wrappedRoute: true,
};

const useStyles = makeStyles(theme => ({
  dialogContent: {
    padding: theme.spacing(3),
  },
  paper: {
    maxWidth: '30em',
  },
  card: {
    padding: theme.spacing(2),
  },
  row: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  successButton: {
    color: '#fff',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.main,
    },
  },
}));

function UnAuthModal({ open, onClose, wrappedRoute }) {
  const classes = useStyles();
  // const history = useHistory();
  // const theme = useTheme();
  // const { prevLocation } = useSelector(state => state.location);
  const { openModal, closeModal } = useModal();

  // const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  // const handleClose = () => {
  //   if (wrappedRoute) {
  //     if (history && prevLocation) {
  //       history.push(prevLocation.pathname);
  //     } else {
  //       history.push('/events');
  //     }
  //   }

  //   onClose();
  // };

  return (
    <ModalWrapper
      title='You need to be signed in to do that'
      alignTitle='center'
      modalType='UnAuthModal'
      closeable={false}
    >
      <Grid container direction='column'>
        <Grid
          item
          container
          justify='center'
          className={classes.row}
          style={{ marginTop: 0 }}
        >
          <Typography variant='body1' align='center'>
            Please either login or register to see this content
          </Typography>
        </Grid>
        <Grid item container className={classes.row}>
          <ButtonGroup variant='contained' fullWidth>
            <Button
              color='primary'
              style={{ color: '#fff' }}
              onClick={() => openModal('LoginModal')}
            >
              Login
            </Button>
            <Button
              className={classes.successButton}
              onClick={() => openModal('RegisterModal')}
            >
              Register
            </Button>
          </ButtonGroup>
        </Grid>
        <Divider className={classes.row} />
        <Grid item className={classes.row}>
          <Typography variant='body1' align='center' color='textSecondary'>
            Or click cancel to continue as guest
          </Typography>
        </Grid>
        <Grid
          item
          container
          justify='center'
          alignItems='center'
          className={classes.row}
          style={{ marginBottom: 0 }}
        >
          <Button variant='contained' onClick={closeModal}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </ModalWrapper>
  );
}

export default UnAuthModal;
