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
import STOMPtest from './DrawingCanvas/STOMPtest';
import CanvasSelector from './DrawingCanvas/CanvasSelector';
import MainArea from './MainArea/MainArea';

function App(){
  return(
    <div>
      <Switch>

        <Route exact path="/">
          <Welcome/>
        </Route>

        <Route path="/main">
          <MainArea/>
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signup">
          <Signup/>
        </Route>

        <PrivateRoute path="/test" component={<h1>Succesful</h1>}>
          
        </PrivateRoute>
        
      </Switch>
    </div>
  )
};

export default App;
