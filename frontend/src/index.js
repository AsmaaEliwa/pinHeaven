import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store';
import * as sessionActions from './store/session';
import csrfFetch from './store/csrf';
import {ModalProvider} from "./componants/context/model"
import {PinModalProvider} from "./componants/pinModal/index"
const store = configureStore();
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}
function Root() {
  
  return (
    <ModalProvider>

    <PinModalProvider>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
    
    </PinModalProvider>
    </ModalProvider>

  );
}
const renderApplication = () => {
  createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  
);}

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null 
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}
