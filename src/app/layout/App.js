import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import AlertManager from 'app/cores/alert/AlertManager';
import DrawerManager from 'app/cores/drawer/DrawerManager';
import ModalManager from 'app/cores/modal/ModalManager';

import HomePage from 'app/layout/pages/HomePage';
import PlaygroundPage from 'features/playground/PlaygroundPage';
import NotFoundPage from 'app/layout/pages/NotFoundPage';

function App() {
  return (
    <div className='App'>
      <AlertManager />
      <DrawerManager />
      <ModalManager />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/playground' component={PlaygroundPage} />
        <Route render={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
