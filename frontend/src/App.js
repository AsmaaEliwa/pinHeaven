import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navigation from './componants/Navigation/index.js';
import UserProfile from './componants/profileNavBar/userProfile.js';
import UpdateProfileForm from './componants/updateProfile/index.js';
import Home from './componants/Home/index.js';
import CreatePinFprm from './componants/pin/createPin/index.js';
import EditPinForm from './componants/pin/editPin/index';
import CreateBoardForm from './componants/board/creatBoard/index.js';
import ProfileHome from './componants/profileNavBar/profileHome.js';
import SgowBoardPin from './componants/boardPins/boardPinShow/index.js';
function App() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>

      <Navigation />
      <Switch>
        
        <Route path="/boards/new">
          <CreateBoardForm user={sessionUser}/>
        </Route>
        <Route path="/pins/new">
         <CreatePinFprm user={sessionUser}/>
        </Route>
        {
        <Route path={`/users/:userId`}>
          <UserProfile/>
        </Route>
        }
          {
        <Route path={`/boards/:boardId`}>
          <SgowBoardPin/>
        </Route>
        }
        <Route path="/update">
          <UpdateProfileForm user={sessionUser} />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        {
        <Route path={`/pins/edit/:pinId`}>
         <EditPinForm user={sessionUser} />
        </Route>
        }
        <Route path="/">
          <ProfileHome></ProfileHome>
        </Route>
      </Switch>
    </>
  );
}

export default App;