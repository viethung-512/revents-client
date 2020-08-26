import React from 'react';

import TestModal from 'features/playground/TestModal';
import LoginModal from 'features/auth/login/LoginModal';
import RegisterModal from 'features/auth/register/RegisterModal';

function ModalManager(props) {
  return (
    <span>
      <TestModal />
      <LoginModal />
      <RegisterModal />
    </span>
  );
}

export default ModalManager;
