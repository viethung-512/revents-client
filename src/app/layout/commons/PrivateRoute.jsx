import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LayoutPage from '../pages/LayoutPage';
import UnAuthModal from 'features/auth/UnAuthModal';
import useModal from 'hooks/useModal';

function PrivateRoute({ component: Component, ...rest }) {
  // const { loading } = useSelector(state => state.async);
  const { authenticated, initialized } = useSelector(state => state.auth);

  const { openModal } = useModal();

  useEffect(() => {
    if (initialized && !authenticated) {
      openModal('UnAuthModal');
    }

    // eslint-disable-next-line
  }, [initialized]);

  return (
    <Route
      {...rest}
      render={props =>
        initialized && !authenticated ? (
          <LayoutPage>
            <UnAuthModal />
          </LayoutPage>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default PrivateRoute;
