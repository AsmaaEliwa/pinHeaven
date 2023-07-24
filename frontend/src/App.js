import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './componants/LoginFormPage/index.js';
import SignupFormPage from './componants/SignupFormPage/index.js';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navigation from './componants/Navigation/index.js';
function App() {
  // const sessionUser = useSelector(state => state.session.user);
  // if (!sessionUser) return <Redirect to="/login" />;
  return (
    <>
   
    <Navigation/>
    <Switch>
      {/* <Route path="/login">
        <LoginFormPage />
      </Route> */}
      {/* <Route path="/signup">
        <SignupFormPage />
      </Route> */}
    </Switch>
    </>
  );
}

export default App;