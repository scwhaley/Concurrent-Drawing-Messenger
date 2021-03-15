import React, { useState, useEffect } from 'react';
import './DrawingCanvas.css';
import { Client } from '@stomp/stompjs';
import Line from './Line'
import Message from './Message'

function DrawingCanvasFunctional(){

    var [stompClient, setStompClient] = useState(new Client());
    var [mouseIsDown, setMouseDown] = useState(false);
    var [canvas, setCanvas] = useState();
    var [canvasContext, setCanvasContext] = useState();
    var [canvasLastX, setCanvasLastX] = useState(0);
    var [canvasLastY, setCanvasLastY] = useState(0);

    // By using an empty array as the second parameter, this effect will only run on mount and dismount
    useEffect(() => {
        console.log('Start of useEffect')
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
                const subscription = stompClient.subscribe("/topic/test/room1", handleIncomingMessages);
            }
        };

        var stompClient = new Client(stompConfig);
        // Canvas Setup
        var canvas = document.getElementById('CanvasID');
        var ctx = canvas.getContext('2d');

        //Must add event listeners this way. Adding them directly to the canvas HTML element
        // does connect the mouse event object to the function.
        canvas.addEventListener("mousedown", canvasOnMouseDown, false);
        canvas.addEventListener("mouseup", canvasOnMouseUp, false);
        canvas.addEventListener("mousemove", canvasOnMouseMove, false);

        console.log('Acivating stomp client');
        stompClient.activate();

        setStompClient(stompClient);
        setCanvasContext(ctx);
        setCanvas(canvas);
        console.log('canvas: ' + canvas);
        console.log('stompClient: ' + stompClient);
        console.log('end of useEffect')

        // Drawing functions
        var canvasOnMouseDown = (e) => {
            console.log('In canvas on mouse down')
            setMouseDown(true);
            setCanvasLastX(e.offsetX);
            setCanvasLastY(e.offsetY);
        }

        // Drawing functions
        var canvasOnMouseUp = (e) => {
            console.log('in canvas on mouse up')
            setMouseDown(false);
            setCanvasLastX(e.offsetX);
            setCanvasLastY(e.offsetY);
        }

        // Drawing functions
        var canvasOnMouseMove = (e) => {
            if(mouseIsDown){
                var line = new Line(canvasLastX, canvasLastY, e.offsetX, e.offsetY);
                var message = new Message("Draw", line);
                stompClient.publish({destination: "/app/message/room1", body: JSON.stringify(message)});
                setCanvasLastX(e.offsetX);
                setCanvasLastY(e.offsetY);
            }
        }

        var handleIncomingMessages = (message) => {
            console.log('in handle incoming messgae');

            
            // Parse the message
            const payload = JSON.parse(message.body);
            const content = payload.content;
    
            var canvas = document.getElementById('CanvasID');
            var ctx = canvas.getContext('2d');

            // Call the appropriate function based on message type
            switch(payload.type) {
                case "Draw":
                    drawLine(ctx, content.x1, content.y1, content.x2, content.y2);
                    break;
                case "Refresh":
                    drawImageToCanvas(content);
                    break;
                case "Sync":
                    handleSync();
                    break;
                default:
                    break;
            }
        }

            // Uses a dataURL to draw an image to the canvas
    var drawImageToCanvas = (imgDataURL) => {
        console.log('In drawImagetoCanvas')
        var canvas = document.getElementById('CanvasID');
        var ctx = canvas.getContext('2d');

        var img = new Image();
        img.onload = () => {
            ctx .drawImage(img,0,0);
        };
        img.src = imgDataURL;
    }

    // Drawing functions
    var drawLine = (context, x1, y1, x2, y2) => {
        console.log('in Drawline')
        context.beginPath();
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.moveTo(x1, y1);
        context.lineTo(x2,y2);
        context.stroke();
        context.closePath();
    };
    
    // Sends a message containing an dataURL representing the current state of the canvas
    var handleSync = () => {
        console.log('in HandleSync');
        
        let canvas = document.getElementById('CanvasID');
        var canvasDataURL = canvas.toDataURL();
        var message = new Message("Refresh", canvasDataURL);
        console.log('got to before publish')
        stompClient.publish({destination: "/app/message/room1", body: JSON.stringify(message)});
        console.log('got to after publish')
    }
    }
    ,[]);









    return(
        <div>
            <canvas id="CanvasID" />
            <h1>dfgdfg</h1>
        </div>
    );
}

export default DrawingCanvasFunctional;