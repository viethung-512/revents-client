import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery, gql } from '@apollo/client';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import AlertManager from 'app/cores/alert/AlertManager';
import DrawerManager from 'app/cores/drawer/DrawerManager';
import ModalManager from 'app/cores/modal/ModalManager';

import HomePage from 'app/layout/pages/HomePage';
import PlaygroundPage from 'features/playground/PlaygroundPage';
import NotFoundPage from 'app/layout/pages/NotFoundPage';
import EventAction from 'features/event/event-action/EventAction';
import EventDashboard from 'features/event/event-dashboard/EventDashboard';
import { setAuth, setUnAuth } from 'features/auth/authSlice';
import LoadingContainer from './commons/async/LoadingContainer';
import EventDetailed from 'features/event/event-detailed/EventDetailed';

const INITIALIZE_USER = gql`
  query getMe {
    getMe {
      id
      username
      email
      description
      photoURL
      createdAt
    }
  }
`;

function App() {
  const dispatch = useDispatch();
  const { loading } = useQuery(INITIALIZE_USER, {
    onError: err => {
      console.log('Error while fetching auth user');
      dispatch(setUnAuth());
    },
    onCompleted: data => {
      dispatch(setAuth(data.getMe));
    },
  });

  return (
    <div className='App'>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <LoadingContainer loading={loading} size={40} thickness={4.5} />
        <AlertManager />
        <DrawerManager />
        <ModalManager />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/events' component={EventDashboard} />
          <Route exact path='/events/:id' component={EventDetailed} />
          <Route
            exact
            path={['/event/manage/:id', '/create-event']}
            component={EventAction}
          />
          <Route path='/playground' component={PlaygroundPage} />
          <Route render={NotFoundPage} />
        </Switch>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
