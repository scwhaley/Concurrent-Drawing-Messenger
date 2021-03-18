import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';

function STOMPtest(){
    // By using an empty array as the second parameter, this effect will only run on mount and dismount
    var stompClient = useRef();

    useEffect(() => {
        console.log('Start of useEffect');
        
        var handleIncomingMessages = (message) => {
            console.log('in handle incoming message. Message: ' + message.body);
            stompClient.current.publish
        }

        //STOMP Client setup
        var stompConfig = {
            connectHeaders: {
                login: "guest",
                passcode: "guest"
            },
            brokerURL: "ws://localhost:8080/greeting/websocket",
            reconnectDelay: 200,
            onConnect: (frame) => {
                console.log("Connected");
                console.log("Subscribing to /topic/test/room1");
                const subscription = stompClient.current.subscribe("/topic/test/room1", handleIncomingMessages);
            }
        };

        //Activate STOMP client
        console.log('Acivating stomp client');
        stompClient.current = new Client(stompConfig);
        stompClient.current.activate();
    
        console.log('end of useEffect');
    },[]);

    var testOnClick = () => {
        stompClient.current.publish({destination: "/app/message/room1", body: "Test Click"});
    }

    return(
        <div>
            <h1>Blank (for now)</h1>
            <button/><button/><button/><button/>
            <button onClick={testOnClick}>TestClick</button>
        </div>
    )
}

export default STOMPtest;

