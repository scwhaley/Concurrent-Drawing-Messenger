import logo from './logo.svg';
import './App.css';
import './Login/Login.js'
import React from 'react'
import Login from './Login/Login.js';


class App extends React.Component{
  constructor(){
    super();
    this.state = {isLoggedIn: false};
  }
  render(){
    if(this.state.isLoggedIn === false){
      return(
        <div className="TopAppDiv">
          <Login/>
        </div>
      );
    }
  };
};

export default App;
