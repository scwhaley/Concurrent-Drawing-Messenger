import React, { Component } from 'react';
import './DrawingCanvas.css';
import { Client } from '@stomp/stompjs';

class DrawingCanvas extends Component{
    constructor(){
        super();

        var stompClient;

        var stompConfig = {
            connectHeaders: {
                login: "guest",
                passcode: "guest"
            },

            brokerURL: "ws://localhost:8080/greeting/websocket",

            debug: (str) => {console.log("Stomp: " + str)},

            reconnectDelay: 200,

            onConnect: (frame) => {
                console.log("Connected. Frame: " + frame);
                console.log("Subscripting to /topic/test...");
                const subscription = stompClient.subscribe("/topic/test", (message) => {
                    const payload = JSON.parse(message.body);
                    console.log("Recieved message from subscription. Response body: " + payload);
                })
            }
        };

        stompClient = new Client(stompConfig);
        stompClient.activate();
                  
        this.state = {
            stompClient: stompClient
        };
    }

    ConnectClick(){
    }

    SubscribeClick(){
        //this.state.wsClient.subscribe('/topic/test', () => {alert("message from subscription")});
    }

    SendClick = () => {
        console.log(this.state.stompClient);
        this.state.stompClient.publish({destination: "/app/message", body: "Hello, STOMP"});
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