import React, { Component } from 'react';
import './DrawingCanvas.css';
import { Client, Message, Stomp } from 'stomp-js';
import {SockJS} from 'sockjs'

class DrawingCanvas extends Component{
    constructor(){
        super();

        var stomp_args = {
                    port: 8080,
                    host: 'localhost',
                    debug: true,
                    login: 'guest',
                    passcode: 'guest',
                };
                
        var ws = new SockJS('ws://localhost:8080/greeting');
        var client = Stomp.(ws);  
        client.

    

        this.state = {
            wsClient: client
        }
        
    }

    

    ConnectClick(){

    }

    SubscribeClick(){
        this.state.wsClient.subscribe('/topic/test', () => {alert("message from subscription")});
    }

    SendClick(){
    }



    render(){
        return(
            <div>
                <button onClick={this.ConnectClick}>Connect</button>
                <button>Subscribe</button>
                <button onClick={this.SendClick}>Send Message</button>
                <canvas/>
            </div>
        );
    };
}

export default DrawingCanvas