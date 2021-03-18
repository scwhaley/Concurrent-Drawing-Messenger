import React, { useEffect, useRef } from 'react';
import './DrawingCanvas.css';
import { Client } from '@stomp/stompjs';
import Line from './Line'
import Message from './Message'

function DrawingCanvasFunctional(){

    var stompClient = useRef();
    var mouseIsDown = useRef(false);
    var canvas = useRef();
    var canvasLastX = useRef(0);
    var canvasLastY = useRef(0);
    var subscription = useRef();




    // By using an empty array as the second parameter, this effect will only run on mount and dismount
    useEffect(() => {
        console.log('Start of useEffect');
        
        // Uses a dataURL to draw an image to the canvas
        var drawImageToCanvas = (context, imgDataURL) => {
            console.log('In drawImagetoCanvas')

            var img = new Image();
            img.onload = () => {
                context.drawImage(img,0,0);
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
            
            var canvasDataURL = canvas.current.toDataURL();
            var message = new Message("Refresh", canvasDataURL);
            console.log('got to before publish')
            stompClient.current.publish({destination: "/app/message/room1", body: JSON.stringify(message)});
            console.log('got to after publish')
        }

        var handleIncomingMessages = (message) => {
            console.log('in handle incoming messgae');

            // Parse the message
            const payload = JSON.parse(message.body);
            const content = payload.content;
    
            var ctx = canvas.current.getContext('2d');
    
            // Call the appropriate function based on message type
            switch(payload.type) {
                case "Draw":
                    drawLine(ctx, content.x1, content.y1, content.x2, content.y2);
                    break;
                case "Refresh":
                    drawImageToCanvas(ctx, content);
                    break;
                case "Sync":
                    handleSync();
                    break;
                default:
                    break;
            }
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
                subscription.current = stompClient.current.subscribe("/topic/test/room1", handleIncomingMessages);
            }
        };
    
        stompClient.current = new Client(stompConfig);
        

        //Must add event listeners this way. Adding them directly to the canvas HTML element
        //does connect the mouse event object to the function.

        //Drawing functions
        var canvasOnMouseDown = (e) => {
            console.log('In canvas on mouse down')
            mouseIsDown.current = true;
            canvasLastX.current = e.offsetX;
            canvasLastY.current = e.offsetY;
        }
        // Drawing functions
        var canvasOnMouseUp = (e) => {
            console.log('in canvas on mouse up')
            mouseIsDown.current = false;
            canvasLastX.current = e.offsetX;
            canvasLastY.current = e.offsetY;
        }

        // Drawing functions
        var canvasOnMouseMove = (e) => {
            if(mouseIsDown.current){
                var line = new Line(canvasLastX.current, canvasLastY.current, e.offsetX, e.offsetY);
                var message = new Message("Draw", line);
                stompClient.current.publish({destination: "/app/message/room1", body: JSON.stringify(message)});
                canvasLastX.current = e.offsetX;
                canvasLastY.current = e.offsetY;
                }
        };

        canvas.current.addEventListener("mousedown", canvasOnMouseDown, false);
        canvas.current.addEventListener("mouseup", canvasOnMouseUp, false);
        canvas.current.addEventListener("mousemove", canvasOnMouseMove, false);
    
        //Activate STOMP client
        console.log('Acivating stomp client');
        stompClient.current.activate();
    
        console.log('end of useEffect');

        return () => {
            console.log('Unsubscribing');
            subscription.current.unsubscribe();
        }
    }
    ,[]);

    return(
        <div>
            <canvas id="CanvasID" ref={canvas} />
            <h1>dfgdfg</h1>
        </div>
    );
}

export default DrawingCanvasFunctional;