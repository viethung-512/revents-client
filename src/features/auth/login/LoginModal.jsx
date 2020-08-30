import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers';

import ModalWrapper from 'app/cores/modal/ModalWrapper';
import LoginForm from './LoginForm';
import { loginValidator } from 'app/utils/validators';
import { AUTH_LOGIN } from '../graphql/authQuery';
import { setAuth } from '../authSlice';
import useModal from 'hooks/useModal';

const defaultValues = {
  email: '',
  password: '',
};

function LoginModal(props) {
  const dispatch = useDispatch();
  const { control, errors, formState, handleSubmit, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(loginValidator),
  });
  const { closeModal } = useModal();
  const [login, { loading }] = useLazyQuery(AUTH_LOGIN, {
    onError: err => {
      setError('general', { message: err.graphQLErrors[0].message });
    },
    onCompleted: data => {
      dispatch(setAuth(data.login));
      closeModal();
    },
  });

  const handleLogin = values => login({ variables: values });

  return (
    <ModalWrapper title='Login to Revents' modalType='LoginModal' closeable>
      <LoginForm
        submitForm={handleSubmit(handleLogin)}
        control={control}
        errors={errors}
        loading={loading}
        isValid={formState.isValid}
      />
    </ModalWrapper>
  );
}

export default LoginModal;
