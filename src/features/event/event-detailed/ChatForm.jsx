import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';

import RateReviewIcon from '@material-ui/icons/RateReview';

import Input from 'app/layout/commons/form/Input';
import Loading from 'app/layout/commons/async/Loading';
import { Avatar } from '@material-ui/core';

ChatForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  isValid: PropTypes.bool,
  isReply: PropTypes.bool,
  control: PropTypes.any,
  isEventComment: PropTypes.bool,
  closeReply: PropTypes.func,
};

ChatForm.defaultProps = {
  isReply: false,
  isEventComment: false,
};

const useStyles = makeStyles(theme => ({
  commentForm: {
    width: '100%',
  },
  replyButton: {
    color: '#fff',
    width: '10em',
    marginLeft: theme.spacing(2),
  },
}));

function ChatForm({
  submitForm,
  control,
  loading,
  isValid,
  authUser,
  isReply,
  isEventComment,
  closeReply,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <ListItem alignItems='flex-start' style={{ padding: 0 }}>
      <ListItemAvatar>
        <Avatar alt='avatar user' src={authUser.photoURL} variant='rounded' />
      </ListItemAvatar>
      <ListItemText
        style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
      >
        {(isReply || matchesXS) && loading && (
          <LinearProgress color='secondary' />
        )}
        <form className={classes.commentForm} onSubmit={submitForm}>
          <Grid container alignItems='flex-start' justify='space-between'>
            <Grid item style={{ flex: 1 }}>
              <Input
                onFocus={isEventComment ? () => closeReply() : null}
                name='text'
                placeholder='Say something'
                multiline
                rows={isReply ? 1 : 2}
                control={control}
                onKeyPress={e => {
                  if (e.key === 'Enter' && e.shiftKey) {
                    return;
                  }

                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    isValid && submitForm();
                  }
                }}
              />
            </Grid>
            <Grid item>
              <Hidden xsDown>
                {!isReply && (
                  <Button
                    variant='contained'
                    startIcon={!loading && <RateReviewIcon />}
                    className={classes.replyButton}
                    color='secondary'
                    disabled={loading || !isValid}
                    type='submit'
                  >
                    {loading ? (
                      <Loading color={theme.palette.secondary.dark} />
                    ) : (
                      'Add Reply'
                    )}
                  </Button>
                )}
              </Hidden>
            </Grid>
          </Grid>
        </form>
      </ListItemText>
    </ListItem>
  );
}

export default ChatForm;
