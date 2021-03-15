import './App.css';
import React from 'react'
import {
  Switch,
  Route
} from "react-router-dom";
import Login from './Login/Login.js';
import Sidebar from './Sidebar/Sidebar.js';
import DrawingCanvas from './DrawingCanvas/DrawingCanvas.js';
import Welcome from './Welcome/Welcome'
import PrivateRoute from './Utils/PrivateRoute'
import Signup from './Signup/Signup';
import canvasWebSocketContext from './AppContexts/canvasWebSocketContext'
import DrawingCanvasFunctional from './DrawingCanvas/DrawingCanvasFuntional';

function App(){
  return(
    <div>
      <Switch>

        <Route exact path="/">
          <Welcome/>
        </Route>

        <Route path="/main">
          <Sidebar/>
          <DrawingCanvasFunctional/>
        </Route>

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
