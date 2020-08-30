import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useMutation, useLazyQuery } from '@apollo/client';

import LayoutPage from 'app/layout/pages/LayoutPage';
import { eventValidator } from 'app/utils/validators';
import EventForm from './EventForm';
import { categoryData } from 'app/utils/constants';
import {
  EVENT_CREATE,
  EVENT_UPDATE,
  EVENT_CANCEL_TOGGLE,
} from '../graphql/eventMutation';
import { EVENT_FETCH_ITEM } from '../graphql/eventQuery';
import LoadingContainer from 'app/layout/commons/async/LoadingContainer';
import useAlert from 'hooks/useAlert';
import { useEffect } from 'react';

const defaultValues = {
  title: '',
  category: categoryData[0].value,
  description: '',
  city: '',
  venue: '',
  date: null,
};

function EventAction({ match, history }) {
  const eventId = match.params.id;
  const [isCancelled, setIsCancelled] = useState(false);
  const { control, errors, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(eventValidator),
  });
  const { alertError } = useAlert();

  const [createEvent, { loading: createLoading }] = useMutation(EVENT_CREATE, {
    onError: err => {
      console.log(err);
      alertError('Some thing went wrong, please try again.');
    },
    onCompleted: () => history.push('/events'),
  });

  const [updateEvent, { loading: updateLoading }] = useMutation(EVENT_UPDATE, {
    onError: err => {
      console.log(err);
      alertError('Some thing went wrong, please try again.');
    },
    update: (proxy, { data }) => {
      const cache = proxy.readQuery({
        query: EVENT_FETCH_ITEM,
        variables: { id: eventId },
      });

      proxy.writeQuery({
        query: EVENT_FETCH_ITEM,
        variables: { id: eventId },
        data: { ...cache, getEvent: data.updateEvent },
      });
    },
    onCompleted: data => {
      history.push(`/events/${data.updateEvent.id}`);
    },
  });

  const [cancelToggleEvent, { loading: cancelToggleLoading }] = useMutation(
    EVENT_CANCEL_TOGGLE,
    {
      onError: err => {
        console.log(err, 'error while toggle cancel event');
        alertError('Something went wrong, please try again.');
      },
      onCompleted: data => {
        setIsCancelled(data.toggleCancelEvent.isCancelled);
      },
    }
  );

  const [fetchEvent, { loading: fetching }] = useLazyQuery(EVENT_FETCH_ITEM, {
    onError: err => history.push('/not-found'),
    onCompleted: data => {
      setIsCancelled(data.getEvent.isCancelled);
      reset(data.getEvent);
    },
  });

  useEffect(() => {
    if (eventId) {
      fetchEvent({ variables: { id: eventId } });
    }
  }, [eventId, fetchEvent]);

  const submitForm = variables => {
    if (eventId) {
      updateEvent({ variables: { ...variables, id: eventId } });
    } else {
      createEvent({ variables });
    }
  };

  const handleToggleCancelEvent = () => {
    cancelToggleEvent({
      variables: {
        id: eventId,
      },
    });
  };

  return (
    <LayoutPage>
      <LoadingContainer loading={fetching} />
      <EventForm
        control={control}
        submitForm={handleSubmit(submitForm)}
        categories={categoryData}
        errors={errors}
        loading={updateLoading || createLoading}
        isValid={formState.isValid}
        isEditEvent={Boolean(eventId)}
        isCancelled={isCancelled}
        cancelToggleEvent={handleToggleCancelEvent}
        cancelToggleLoading={cancelToggleLoading}
      />
    </LayoutPage>
  );
}

export default EventAction;
