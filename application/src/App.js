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

  loginSubmitHandler = (event) => {
    this.setState({isLoggedIn: true});
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
          <p>Logged in</p>
        </div>
      )
    }
  };
};

export default App;
