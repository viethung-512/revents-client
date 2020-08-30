import React from 'react';

import TestDrawer from 'features/playground/TestDrawer';
import MenuMobileDrawer from 'app/layout/pages/header/MenuMobileDrawer';

const DrawerManager = props => {
  return (
    <span>
      <TestDrawer />
      <MenuMobileDrawer />
    </span>
  );
};

export default DrawerManager;
