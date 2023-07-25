import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navigation from './componants/Navigation/index.js';
import UserPrpfile from './componants/profileNavBar/userPrpfile.js';
import UpdateProfileForm from './componants/updateProfile/index.js';
import Home from './componants/Home/index.js';

function App() {
  const sessionUser = useSelector(state => state.session.user);
  // if (!sessionUser) return <Redirect to="/home" />;
  return (
    <>
   
    <Navigation/>
    <Switch>
    <Route path="/profile">
     {/* <Profile  user={sessionUser} /> */}
      </Route>
      <Route path="/username">
       <UserPrpfile user={sessionUser}/>
      </Route>
      <Route path="/update">
        <UpdateProfileForm />
      </Route>
      <Route path="/home">
      <Home/>
      </Route>
    </Switch>
    </>
  );
}

export default App;