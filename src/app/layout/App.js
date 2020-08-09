import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import AlertManager from 'features/cores/alert/AlertManager';
import DrawerManager from 'features/cores/drawer/DrawerManager';
import ModalManager from 'features/cores/modal/ModalManager';
import Header from './header/Header';

import HomePage from 'features/pages/HomePage';
import NotFoundPage from 'features/pages/NotFoundPage';

function App() {
  return (
    <div className='App'>
      <AlertManager />
      <DrawerManager />
      <ModalManager />
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route render={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
