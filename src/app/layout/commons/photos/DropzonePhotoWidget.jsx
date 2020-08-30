import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

DropzonePhotoWidget.propTypes = {
  setFiles: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
  uploadArea: {
    borderWidth: 4,
    borderStyle: 'dashed',
    borderColor: theme.palette.divider,
    width: '16em',
    height: '8em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadAreaActive: {
    borderColor: theme.palette.success.main,
  },
}));

export default function DropzonePhotoWidget({ setFiles, next }) {
  const classes = useStyles();
  const onDrop = useCallback(
    acceptedFiles => {
      // Do something with the files
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      next();

      // eslint-disable-next-line
    },
    [setFiles, next]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        classes.uploadArea,
        isDragActive && classes.uploadAreaActive
      )}
    >
      <input {...getInputProps()} />
      <Typography variant='h5' gutterBottom>
        Drop image here
      </Typography>
      <CloudUploadIcon fontSize='large' />
    </div>
  );
}
