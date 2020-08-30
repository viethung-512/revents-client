import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers';
import { useMutation } from '@apollo/client';

import ModalWrapper from 'app/cores/modal/ModalWrapper';
import RegisterForm from './RegisterForm';
import { registerValidator } from 'app/utils/validators';
import { AUTH_REGISTER } from '../graphql/authMutation';
import { setAuth } from '../authSlice';
import useModal from 'hooks/useModal';

const defaultValues = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

function RegisterModal(props) {
  const dispatch = useDispatch();
  const { control, errors, formState, handleSubmit, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(registerValidator),
  });
  const { closeModal } = useModal();
  const [register, { loading }] = useMutation(AUTH_REGISTER, {
    onError: err => {
      const registerErrors = err.graphQLErrors[0].extensions.errors;
      for (const key in registerErrors) {
        if (registerErrors.hasOwnProperty(key)) {
          setError(key, { message: registerErrors[key] });
        }
      }
    },
    onCompleted: data => {
      dispatch(setAuth(data.register));
      closeModal();
    },
  });

  const handleRegister = values => register({ variables: values });

  return (
    <ModalWrapper
      title='Register to Revents'
      modalType='RegisterModal'
      closeable
    >
      <RegisterForm
        submitForm={handleSubmit(handleRegister)}
        control={control}
        errors={errors}
        loading={loading}
        isValid={formState.isValid}
      />
    </ModalWrapper>
  );
}

export default RegisterModal;
