import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Skeleton from '@material-ui/lab/Skeleton';

import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  PhotoSkeleton: {
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

function PhotoSkeleton(props) {
  const classes = useStyles();
  return (
    <Card className={classes.PhotoSkeleton}>
      <Skeleton width='10em' height='10em' variant='rect' animation='wave' />
      <CardActions disableSpacing style={{ padding: 0 }}>
        <ButtonGroup variant='contained' fullWidth>
          <Button className={classes.successButton} disabled>
            Main
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            className={classes.errorButton}
            classes={{
              startIcon: classes.startIcon,
            }}
            disabled
          />
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}

export default PhotoSkeleton;
