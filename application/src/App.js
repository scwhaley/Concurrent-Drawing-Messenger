import './App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login/Login.js';
import Sidebar from './Sidebar/Sidebar.js';
import DrawingCanvas from './DrawingCanvas/DrawingCanvas.js';
import Home from './Home/Home'
import PrivateRoute from './RoutingUtils/PrivateRoute'

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      isLoggedIn: false,
      sidebarIsCollapsed: true
    };
  }

  loginSubmitHandler = (event) => {
    this.setState({isLoggedIn: true});
    console.log("Set isLoggedIn to true");
  }

  sidebarToggleClick = () => {
    this.setState({sidebarIsCollapsed: !this.state.sidebarIsCollapsed});
    
    
    if(this.state.sidebarIsCollapsed === true){
        document.getElementById("SidebarContainer").style.left = "-250px";
        document.getElementById("MainContent").style.marginLeft = "60px";
    }
    else{
        document.getElementById("SidebarContainer").style.left = "00px";
        document.getElementById("MainContent").style.marginLeft = "310px";
    }
  }

  render(){
    console.log("In App.js, this.state.isLoggedIn is " + this.state.isLoggedIn);
    return(
      <div>
        <Switch>

          <Route exact path="/">
            <Home/>
          </Route>

          <PrivateRoute path="/main" isLoggedIn={this.state.isLoggedIn}>
            <Sidebar sidebarToggleClick={this.sidebarToggleClick.bind(this)}/>
            <DrawingCanvas/>
          </PrivateRoute>

          <Route path="/login">
            <Login loginSubmitHandler={this.loginSubmitHandler.bind(this)} />
          </Route>
          
        </Switch>
      </div>
    )

    if(this.state.isLoggedIn === false){
      return(
        <div className="TopAppDiv">
          <Login loginSubmitHandler={this.loginSubmitHandler.bind(this)}/>
        </div>
      );
    }
    else{
      return(
        <div className="TopAppDiv">
          <Sidebar sidebarToggleClick={this.sidebarToggleClick.bind(this)}/>
          <div id="MainContent">
            <p>Main Content</p>
            <DrawingCanvas/>
          </div>
        </div>
      )
    }
  };
};

export default App;
