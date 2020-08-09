import React from 'react';
import LayoutPage from 'app/layout/LayoutPage';
import useAlert from 'hooks/useAlert';
import useDrawer from 'hooks/useDrawer';
import useModal from 'hooks/useModal';

import Button from '@material-ui/core/Button';

function HomePage(props) {
  const { alertSuccess } = useAlert();
  const { openDrawer } = useDrawer();
  const { openModal } = useModal();

  return (
    <LayoutPage>
      <div style={{ minHeight: '150vh' }}>
        <h1>Home page</h1>
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
      </div>
    </LayoutPage>
  );
}

export default HomePage;
