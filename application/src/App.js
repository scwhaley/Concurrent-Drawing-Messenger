
import './App.css';
import React from 'react'
import Login from './Login/Login.js';
import Sidebar from './Sidebar/Sidebar.js';
import DrawingCanvas from './DrawingCanvas/DrawingCanvas.js';


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
