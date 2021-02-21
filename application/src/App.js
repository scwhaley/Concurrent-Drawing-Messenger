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
import PrivateRoute from './RoutingUtils/PrivateRoute'
import Signup from './Signup/Signup';

function App(){

  // var sidebarToggleClick = () => {
  //   this.setState({sidebarIsCollapsed: !this.state.sidebarIsCollapsed});
    
  //   if(this.state.sidebarIsCollapsed === true){
  //       document.getElementById("SidebarContainer").style.left = "-250px";
  //       document.getElementById("MainContent").style.marginLeft = "60px";
  //   }
  //   else{
  //       document.getElementById("SidebarContainer").style.left = "00px";
  //       document.getElementById("MainContent").style.marginLeft = "310px";
  //   }
  // }

  return(
    <div>
      <Switch>

        <Route exact path="/">
          <Welcome/>
        </Route>

        <PrivateRoute path="/main" component={Sidebar}>
          {/* <Sidebar sidebarToggleClick={sidebarToggleClick}/>*/}
          <Sidebar/>
          <DrawingCanvas/>
        </PrivateRoute>

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
