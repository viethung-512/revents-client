import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

CommentItem.propTypes = {
  comment: PropTypes.object,
  replies: PropTypes.array,
  showReplyForm: PropTypes.object,
  setShowReplyForm: PropTypes.func,
  authUser: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
  commentAuthor: {
    marginRight: theme.spacing(2),
    textDecoration: 'none',
    fontWeight: 500,
  },
  commentButton: {
    textTransform: 'unset',
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
  },
}));

function CommentItem({
  comment,
  replies,
  showReplyForm,
  setShowReplyForm,
  authUser,
}) {
  const classes = useStyles();

  return (
    <ListItem alignItems='flex-start' style={{ padding: 0 }}>
      <ListItemAvatar>
        <Avatar
          alt={comment?.displayName}
          src={comment?.photoURL}
          variant='rounded'
        />
      </ListItemAvatar>
      <ListItemText>
        <Grid container>
          <Grid item container alignItems='center'>
            <Grid item>
              <Typography
                variant='body1'
                className={classes.commentAuthor}
                component={ReactRouterLink}
                to={`/profile/${comment?.uid}`}
                color='textPrimary'
              >
                {comment?.displayName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='caption' color='textSecondary'>
                {formatDistance(comment?.date, new Date())}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container>
            <Typography variant='body2'>
              {comment?.text.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </Typography>
          </Grid>
          <Grid item container>
            <Link
              component='button'
              variant='body2'
              name={comment.id}
              className={classes.commentButton}
              onClick={e => {
                if (comment.parentId === 0) {
                  if (e.target.name === showReplyForm.element) {
                    setShowReplyForm({
                      show: !showReplyForm.show,
                      element: comment.id,
                    });
                  } else {
                    setShowReplyForm({
                      show: true,
                      element: comment.id,
                    });
                  }
                } else {
                  setShowReplyForm({
                    show: true,
                    element: comment.parentId,
                  });
                }
              }}
            >
              Reply
            </Link>
          </Grid>
          {replies && replies.length > 0 && (
            <List>
              {replies.map(reply => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  showReplyForm={showReplyForm}
                  setShowReplyForm={setShowReplyForm}
                />
              ))}
            </List>
          )}
        </Grid>
      </ListItemText>
    </ListItem>
  );
}

export default CommentItem;
