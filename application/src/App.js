import './App.css';
import React from 'react'
import { Switch } from "react-router-dom";
import Login from './Login/Login.js';
import Welcome from './Welcome/Welcome'
import PrivatePage from './Utils/PrivatePage'
import Signup from './Signup/Signup';
import MainSite from './MainSite/MainSite';
import Page from './Utils/Page'

function App(){
  return(
    <div className='appDiv'>
      <Switch>

        <Page exact path="/" title='Home | WebsiteName'>
          <Welcome/>
        </Page>

        <PrivatePage path="/main" title='Main | WebsiteName'>
          <MainSite/>
        </PrivatePage>
    

        <Page path="/login" title='Login | WebsiteName'>
          <Login />
        </Page>

        <Page path="/signup" title='Signup | WebsiteName'>
          <Signup/>
        </Page>
        
      </Switch>
    </div>
  )
};

export default App;
