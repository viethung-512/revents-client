import React from 'react';

import TestModal from 'features/playground/TestModal';
import LoginModal from 'features/auth/login/LoginModal';
import RegisterModal from 'features/auth/register/RegisterModal';
import UnAuthModal from 'features/auth/UnAuthModal';

function ModalManager(props) {
  return (
    <span>
      <TestModal />
      <LoginModal />
      <RegisterModal />
      <UnAuthModal />
    </span>
  );
}

export default ModalManager;
