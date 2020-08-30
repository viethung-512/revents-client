import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';

import DeleteIcon from '@material-ui/icons/Delete';
import useAlert from 'hooks/useAlert';
import Spinner from '../async/Spinner';
import {
  PROFILE_SET_MAIN_PHOTO,
  PROFILE_DELETE_PHOTO,
} from 'features/profile/graphql/profileMutation';
import {
  PROFILE_GET_USER,
  PROFILE_GET_PHOTOS,
} from 'features/profile/graphql/profileQuery';

PhotoItem.propTypes = {
  photo: PropTypes.object.isRequired,
  isMainPhoto: PropTypes.bool,
  isAuthUser: PropTypes.bool,
  userId: PropTypes.string,
  updateProfileImage: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
  photoItem: {
    maxWidth: '10em',
    width: '100%',
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

function PhotoItem({
  photo,
  isMainPhoto,
  isAuthUser,
  userId,
  updateProfileImage,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const { alertError } = useAlert();
  const [setMainPhoto, { loading: updating }] = useMutation(
    PROFILE_SET_MAIN_PHOTO,
    {
      onError: err => {
        console.log(err);
        alertError('Some thing went wrong, please try again');
      },
      update: (
        proxy,
        {
          data: {
            setMainPhoto: { photoURL },
          },
        }
      ) => {
        const cache = proxy.readQuery({
          query: PROFILE_GET_USER,
          variables: { id: userId },
        });
        const newUser = {
          ...cache,
          getUser: { ...cache.getUser, photoURL },
        };

        proxy.writeQuery({
          query: PROFILE_GET_USER,
          variables: { id: userId },
          data: newUser,
        });
        updateProfileImage(photoURL);
      },
    }
  );
  const [deletePhoto, { loading: deleting }] = useMutation(
    PROFILE_DELETE_PHOTO,
    {
      onError: err => {
        console.log(err);
        alertError('Some thing went wrong, please try again');
      },
      update: (
        proxy,
        {
          data: {
            deletePhoto: { photos },
          },
        }
      ) => {
        const cache = proxy.readQuery({
          query: PROFILE_GET_PHOTOS,
          variables: { id: userId },
        });
        proxy.writeQuery({
          query: PROFILE_GET_PHOTOS,
          variables: { id: userId },
          data: {
            ...cache,
            getUser: { ...cache.getUser, photos },
          },
        });
      },
    }
  );

  const handleSetMainPhoto = () => {
    setMainPhoto({ variables: { photo: photo.url } });
  };

  const handleDeletePhoto = () => {
    deletePhoto({ variables: { photo: photo.url } });
  };

  return (
    <Card className={classes.photoItem}>
      <CardMedia image={photo.url} style={{ height: '10em' }} />
      {isAuthUser && (
        <CardActions disableSpacing style={{ padding: 0 }}>
          <ButtonGroup
            variant='contained'
            fullWidth
            disabled={updating || deleting || isMainPhoto}
          >
            <Button
              className={classes.successButton}
              onClick={handleSetMainPhoto}
            >
              {updating ? (
                <Spinner color={theme.palette.success.dark} />
              ) : (
                'Main'
              )}
            </Button>
            <Button className={classes.errorButton} onClick={handleDeletePhoto}>
              {deleting ? (
                <Spinner color={theme.palette.error.dark} />
              ) : (
                <DeleteIcon />
              )}
            </Button>
          </ButtonGroup>
        </CardActions>
      )}
    </Card>
  );
}

export default PhotoItem;
