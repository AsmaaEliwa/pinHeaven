import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navigation from './componants/Navigation/index.js';
import UserProfile from './componants/profileNavBar/userProfile.js';
import UpdateProfileForm from './componants/updateProfile/index.js';
import Home from './componants/Home/index.js';
import { Redirect } from 'react-router-dom';

function App() {
  const sessionUser = useSelector(state => state.session.user);
  // if (!sessionUser) return <Redirect to="/home" />;
  return (
    <>

      <Navigation />
      <Switch>
        <Route path="/profile">
          {/* <Profile  user={sessionUser} /> */}
        </Route>
        <Route path="/username">
          <UserProfile user={sessionUser} />
        </Route>
        <Route path="/update">
          <UpdateProfileForm />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;