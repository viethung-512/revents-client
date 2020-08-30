import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import UploadPhotoWidget from 'app/layout/commons/photos/UploadPhotoWidget';
import PhotoItem from 'app/layout/commons/photos/PhotoItem';
import TabPanel from './TabPanel';
import PhotoSkeleton from 'app/layout/commons/photos/PhotoSkeleton';
import { updateProfileImage } from 'features/auth/authSlice';

PhotosTab.propTypes = {
  profile: PropTypes.object,
  isAuthUser: PropTypes.bool,
  userId: PropTypes.string,
  value: PropTypes.number,
  loading: PropTypes.bool,
  photos: PropTypes.array,
};

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2),
  },
  tag: {
    border: 'none',
  },
  tagIcon: {
    marginLeft: '0 !important',
    width: 40,
    height: 40,
  },
  photoItem: {
    maxWidth: '10em',
    width: '100%',
  },
  startIcon: {
    margin: 0,
  },
  successButton: {
    borderRadius: 0,
    textTransform: 'unset',
    color: '#fff',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  errorButton: {
    borderRadius: 0,
    color: '#fff',
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const PhotoItemWrapper = ({ children }) => {
  return (
    <Grid item container justify='center' xs={6} sm={4} md={3} lg={2}>
      {children}
    </Grid>
  );
};

function PhotosTab({ profile, isAuthUser, userId, value, loading, photos }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const resetMode = () => setEditMode(false);

  const updateAuthImageProfile = photo => dispatch(updateProfileImage(photo));

  const photoURL = profile?.photoURL;
  const photosWithoutMainPhotos = photos.filter(p => p.url !== photoURL);

  return (
    <TabPanel value={value} index={1} loading={loading}>
      <Grid container direction='column'>
        <Grid
          item
          container
          justify='space-between'
          alignItems='center'
          className={classes.card}
        >
          <Grid item>
            <Chip
              className={classes.tag}
              classes={{
                icon: classes.tagIcon,
              }}
              icon={<AccountCircleIcon fontSize='large' />}
              label={<Typography variant='h6'>Photo</Typography>}
              variant='outlined'
            />
          </Grid>
          {isAuthUser && (
            <Grid item>
              <Button
                variant='outlined'
                onClick={() => setEditMode(!editMode)}
                size='small'
              >
                {editMode ? 'Cancel' : 'Add Photo'}
              </Button>
            </Grid>
          )}
        </Grid>
        <Divider />
        <Grid item container className={classes.card}>
          {editMode && isAuthUser && (
            <UploadPhotoWidget
              resetMode={resetMode}
              userId={userId}
              updateProfileImage={updateAuthImageProfile}
            />
          )}
          {!editMode && (
            <Grid container spacing={2}>
              {loading && (
                <PhotoItemWrapper>
                  <PhotoSkeleton />
                </PhotoItemWrapper>
              )}
              {photos.length === 0 && !loading && (
                <Grid item>
                  <Typography variant='body1'>
                    {isAuthUser
                      ? "You don't have any image yet."
                      : "This user doesn't have any images."}
                  </Typography>
                </Grid>
              )}
              {photoURL && (
                <PhotoItemWrapper>
                  <PhotoItem
                    photo={{ url: profile.photoURL }}
                    isMainPhoto={true}
                    isAuthUser={isAuthUser}
                  />
                </PhotoItemWrapper>
              )}
              {photosWithoutMainPhotos.map(photo => (
                <PhotoItemWrapper key={photo.id}>
                  <PhotoItem
                    photo={photo}
                    isMainPhoto={false}
                    isAuthUser={isAuthUser}
                    userId={userId}
                    updateProfileImage={updateAuthImageProfile}
                  />
                </PhotoItemWrapper>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </TabPanel>
  );
}

export default PhotosTab;
