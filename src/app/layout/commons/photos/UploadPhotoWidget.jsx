import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import LinearProgress from '@material-ui/core/LinearProgress';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import PublishIcon from '@material-ui/icons/Publish';

import DropzonePhotoWidget from './DropzonePhotoWidget';
import CropperPhotoWidget from './CropperPhotoWidget';
import useAlert from 'hooks/useAlert';
import Spinner from '../async/Spinner';
import { PROFILE_UPLOAD_IMAGE } from 'features/profile/graphql/profileMutation';
import {
  PROFILE_GET_USER,
  PROFILE_GET_PHOTOS,
} from 'features/profile/graphql/profileQuery';

UploadPhotoWidget.propTypes = {
  resetMode: PropTypes.func,
  userId: PropTypes.string,
  updateProfileImage: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  stepsContainer: {
    padding: 0,
    alignItems: 'baseline',
  },
  stepLabel: {
    flexDirection: 'column-reverse',
  },
  stepTitle: {
    textTransform: 'uppercase',
    fontSize: '1rem',
    marginBottom: theme.spacing(1.5),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  stepContent: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
  },
  imagePreview: {
    width: 300,
    height: 'auto',
    minWidth: 200,
    minHeight: 200,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 0,
  },
  cardActions: {
    padding: 0,
  },
  successButton: {
    borderRadius: 0,
    backgroundColor: theme.palette.success.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  errorButton: {
    borderRadius: 0,
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  iconButton: {
    margin: 0,
  },
}));

function getSteps() {
  return [
    { label: 'Add Photo', icon: <AddAPhotoIcon /> },
    { label: 'Resize', icon: <AspectRatioIcon /> },
    { label: 'Review & Upload', icon: <PublishIcon /> },
  ];
}

export default function UploadPhotoWidget({
  resetMode,
  userId,
  updateProfileImage,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const [activeStep, setActiveStep] = useState(0);
  // const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const { alertError, alertSuccess } = useAlert();
  const steps = getSteps();
  const [uploadProfileImage, { loading }] = useMutation(PROFILE_UPLOAD_IMAGE, {
    onError: err => {
      console.log(err);
      alertError('Some thing went wrong, please try again.');
    },
    update: (
      proxy,
      {
        data: {
          uploadProfileImage: { photos, photoURL },
        },
      }
    ) => {
      const cache = proxy.readQuery({
        query: PROFILE_GET_USER,
        variables: { id: userId },
      });
      proxy.writeQuery({
        query: PROFILE_GET_USER,
        variables: { id: userId },
        data: {
          ...cache,
          getUser: {
            ...cache.getUser,
            photoURL,
            photos,
          },
        },
      });
      proxy.writeQuery({
        query: PROFILE_GET_PHOTOS,
        variables: { id: userId },
        data: {
          ...cache,
          getUser: {
            ...cache.getUser,
            photoURL,
            photos,
          },
        },
      });
      updateProfileImage(photoURL);
    },
    onCompleted: data => {
      alertSuccess('Your image has been uploaded.');
      resetMode();
    },
  });

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
    setActiveStep(0);
  };

  const handleUploadImage = () => {
    uploadProfileImage({ variables: { image } });
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} className={classes.stepsContainer}>
        {steps.map(step => (
          <Step key={step.label}>
            <StepLabel
              classes={{
                root: classes.stepLabel,
              }}
            >
              {matchesXS ? (
                step.icon
              ) : (
                <Typography
                  variant='body1'
                  color='primary'
                  className={classes.stepTitle}
                >
                  {step.label}
                </Typography>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        justify='center'
        alignItems='center'
        className={classes.stepContent}
      >
        {activeStep === 0 ? (
          <Grid item>
            <DropzonePhotoWidget setFiles={setFiles} next={handleNext} />
          </Grid>
        ) : (
          <Grid
            item
            container
            spacing={2}
            justify={matchesXS ? 'center' : 'space-between'}
            alignItems='flex-start'
          >
            <Grid item container justify='center' xs={10} sm={6}>
              {files.length > 0 && (
                <CropperPhotoWidget
                  next={handleNext}
                  setImage={setImage}
                  imagePreview={files[0].preview}
                />
              )}
            </Grid>
            <Grid item container justify='center' xs={10} sm={6}>
              {files.length > 0 && (
                <Card>
                  <CardContent className={classes.cardContent}>
                    <div
                      className={clsx('img-preview', classes.imagePreview)}
                    />
                    {/* <LinearProgress variant='determinate' value={progress} /> */}
                  </CardContent>
                  <CardActions disableSpacing className={classes.cardActions}>
                    <ButtonGroup variant='contained' fullWidth>
                      <Button
                        className={classes.successButton}
                        onClick={handleUploadImage}
                        disabled={loading}
                      >
                        {loading ? <Spinner /> : <CheckIcon />}
                      </Button>
                      <Button
                        className={classes.errorButton}
                        onClick={handleCancelCrop}
                        disabled={loading}
                      >
                        <ClearIcon />
                      </Button>
                    </ButtonGroup>
                  </CardActions>
                </Card>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
