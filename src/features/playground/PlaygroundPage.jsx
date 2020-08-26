import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import LayoutPage from 'app/layout/pages/LayoutPage';
import ActionPage from './action/ActionPage';

import useAlert from 'hooks/useAlert';
import useDrawer from 'hooks/useDrawer';
import useModal from 'hooks/useModal';
import LoadingContainer from 'app/layout/commons/async/LoadingContainer';
import Spinner from 'app/layout/commons/async/Spinner';

const useStyles = makeStyles(theme => ({
  successButton: {
    ...theme.custom.successButton.outlined,
  },
}));

export default function PlaygroundPage() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { alertSuccess } = useAlert();
  const { openDrawer } = useDrawer();
  const { openModal } = useModal();

  return (
    <LayoutPage>
      <LoadingContainer loading={false} />
      <h1>Playground page</h1>

      <Button
        variant='contained'
        color='primary'
        onClick={() => alertSuccess('success message')}
      >
        Alert
      </Button>

      <Button
        variant='contained'
        color='primary'
        onClick={() => openDrawer('TestDrawer')}
      >
        Drawer
      </Button>
      <Button
        variant='contained'
        color='primary'
        onClick={() => openModal('TestModal')}
      >
        Modal
      </Button>

      <Button
        variant='contained'
        color='primary'
        disabled={loading}
        style={{ marginLeft: 16, marginRight: 16, width: '20em' }}
      >
        {loading ? <Spinner /> : 'Loading Button'}
      </Button>
      <Button
        variant='contained'
        color='primary'
        onClick={() => setLoading(!loading)}
      >
        Toggle Loading
      </Button>

      <Divider style={{ marginTop: 24, marginBottom: 24 }} />

      <ActionPage />
      <Divider style={{ marginTop: 24, marginBottom: 24 }} />
      <Button
        variant='outlined'
        color='primary'
        className={classes.successButton}
      >
        Success Button
      </Button>
    </LayoutPage>
  );
}
