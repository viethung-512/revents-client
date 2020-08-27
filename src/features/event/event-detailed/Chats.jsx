import React, { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import CommentItem from './CommentItem';

import { addEventChatComment } from 'app/firestore/firebaseService';
import { eventChatCommentValidator } from 'app/utils/validators';
import useAlert from 'hooks/useAlert';
import ChatForm from './ChatForm';
import { getEventChatRef } from 'app/firestore/firebaseService';
import { firebaseObjectToArray } from 'app/utils/helper';

Chats.propTypes = {
  authenticated: PropTypes.bool,
  eventId: PropTypes.any,
};

const useStyles = makeStyles(theme => ({
  chatsContainer: {
    width: '100%',
  },
  chatsHeader: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  chatsContent: {},
  commentForm: {
    width: '100%',
  },
  replyButton: {
    color: '#fff',
    marginTop: theme.spacing(2),
    width: '10em',
  },
}));

function Chats({ authenticated, eventId, authUser }) {
  const classes = useStyles();
  const { control, handleSubmit, reset, formState } = useForm({
    mode: 'onChange',
    resolver: yupResolver(eventChatCommentValidator),
    defaultValues: { text: '' },
  });
  const {
    control: replyControl,
    handleSubmit: replyHandleSubmit,
    reset: replyReset,
    formState: replyFormState,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(eventChatCommentValidator),
    defaultValues: { text: '' },
  });
  const { alertError } = useAlert();
  const [loading, setLoading] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState({
    show: false,
    element: null,
  });
  const [fetchingComments, setFetchingComments] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getEventChatRef(eventId).on('value', snapshot => {
      if (!snapshot.exists()) {
        setFetchingComments(false);
        return;
      } else {
        const commentsData = firebaseObjectToArray(snapshot.val()).reverse();

        setComments(commentsData);
        setFetchingComments(false);
      }
    });

    return () => {
      getEventChatRef(eventId).off();
    };
  }, [eventId]);

  const closeReply = () =>
    setShowReplyForm({
      show: false,
      element: null,
    });

  const handleComment = ({ text }) => {
    let parentId;
    if (showReplyForm.element) {
      parentId = showReplyForm.element;
    } else {
      parentId = 0;
    }

    setLoading(true);

    addEventChatComment(eventId, { text, parentId })
      .then(() => {
        setLoading(false);
        reset({ text: '' });
        replyReset({ text: '' });
        closeReply();
      })
      .catch(err => {
        setLoading(false);
        alertError('Something went wrong, please try again');
        console.log('error while comment');
      });
  };

  const rootComments = comments.filter(cmt => cmt.parentId === 0);

  return (
    <Card className={classes.chatsContainer}>
      <CardHeader
        className={classes.chatsHeader}
        title={
          authenticated
            ? 'Chat about this events'
            : 'Sign in to view and comments'
        }
        titleTypographyProps={{
          style: { lineHeight: 1 },
          align: 'center',
        }}
      />
      {fetchingComments && <LinearProgress color='secondary' />}
      {authenticated && (
        <CardContent className={classes.chatsContent}>
          <List>
            <ChatForm
              control={control}
              submitForm={handleSubmit(handleComment)}
              loading={loading && !showReplyForm.element}
              isValid={formState.isValid}
              authUser={authUser}
              parentId={0}
              isEventComment={true}
              closeReply={closeReply}
            />
          </List>
          <List>
            {rootComments.length > 0 ? (
              rootComments.map(comment => (
                <Fragment key={comment.id}>
                  <CommentItem
                    comment={comment}
                    showReplyForm={showReplyForm}
                    setShowReplyForm={setShowReplyForm}
                    authUser={authUser}
                    replies={comments.filter(
                      cmt => cmt.parentId === comment.id
                    )}
                  />
                  {authenticated &&
                    showReplyForm.show &&
                    showReplyForm.element === comment.id && (
                      <div style={{ marginLeft: 56 }}>
                        <ChatForm
                          control={replyControl}
                          submitForm={replyHandleSubmit(handleComment)}
                          isValid={replyFormState.isValid}
                          loading={loading}
                          authUser={authUser}
                          isReply={true}
                          parentId={comment.id}
                        />
                      </div>
                    )}
                </Fragment>
              ))
            ) : (
              <Typography variant='body1' gutterBottom>
                This event does not have any comment
              </Typography>
            )}
          </List>
        </CardContent>
      )}
    </Card>
  );
}

export default Chats;
