import React from 'react';

import { useForm } from 'react-hook-form';

import ActionForm from './ActionForm';

export default function ActionPage() {
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: { test: '' },
  });

  const submitForm = values => console.log(values);

  return (
    <div>
      <ActionForm submitForm={handleSubmit(submitForm)} control={control} />
    </div>
  );
}
