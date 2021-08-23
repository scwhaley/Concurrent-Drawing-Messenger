import React, { useEffect, useRef } from 'react'
import { Client, StompConfig } from '@stomp/stompjs'
import STOMPKafkaPayload from './STOMPKafkaPayload';
import fetchErr from '../Utils/FetchErr';

function STOMPTestForKafka(){
    var client = useRef(null);

    var connect = () => {
        client = new Client({
            brokerURL: "ws://localhost:8080/greeting/websocket",
            connectHeaders: {
                login: "guest",
                passcode: "guest"
            },
            debug: function (str) {
                console.log(str);
            },
            onConnect: (str) => {
                console.log(str);
                client.subscribe("/topic/foo2", (message) => {console.log(JSON.parse(message.body))});
            },
            onStompError: (str) => {
                console.log(str);
            },
            onWebSocketError: (str) => {
                console.log(str);
            }
        });
        client.activate();
    }

    

    var sendMessage = () => {
        var payload = new STOMPKafkaPayload("foo", "Key", "Value");

        client.publish({
            destination: "/app/test",
            body: JSON.stringify(payload)
        });
    }

    var sendMessage1 = () => {
        var payload = new STOMPKafkaPayload("foo1", "Key1", "Value1");

        client.publish({
            destination: "/app/test",
            body: JSON.stringify(payload)
        });
    }

    var createConsumer = () => {
        console.log("Pressed create consumer button");
        fetchErr('http://localhost:8080/api/public/canvasConsumer',
        {method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify("/topic/foo2")
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json.message);
        })
        .catch(error => {
            console.log(JSON.stringify(error));
        });
    }

    return(
        <div>
            <button onClick={connect}>Connect</button>
            <button onClick={createConsumer}>Create Consumer</button>
            <button onClick={sendMessage}>Send Message</button>
            <button onClick={sendMessage1}>Send Message1</button>
        </div>
    )
}

export default STOMPTestForKafka;