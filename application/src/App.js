import './App.css';
import React from 'react'
import {
  Switch,
  Route
} from "react-router-dom";
import Login from './Login/Login.js';
import Welcome from './Welcome/Welcome'
import PrivateRoute from './Utils/PrivateRoute'
import Signup from './Signup/Signup';
import ContentArea from './MainSite/ContentArea/ContentArea';

function App(){
  return(
    <div>
      <Switch>

        <Route exact path="/">
          <Welcome/>
        </Route>

        <PrivateRoute path="/main" component={ContentArea}/>
    

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signup">
          <Signup/>
        </Route>
        
      </Switch>
    </div>
  )
};

export default App;
