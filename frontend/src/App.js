import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navigation from './componants/Navigation/index.js';
import UserProfile from './componants/profileNavBar/userProfile.js';
import UpdateProfileForm from './componants/updateProfile/index.js';
import Home from './componants/Home/index.js';
import { Redirect } from 'react-router-dom';
import CreatePinFprm from './componants/pin/createPin/index.js';

function App() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>

      <Navigation />
      <Switch>
        <Route path="/pins/new">
         <CreatePinFprm user={sessionUser}/>
        </Route>
        {/* <Route path="/profile">
          {/* <Profile  user={sessionUser} /> */}
        {/* </Route>  */}
        <Route path="/username">
          <UserProfile user={sessionUser} />
        </Route>
        <Route path="/update">
          <UpdateProfileForm user={sessionUser} />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;