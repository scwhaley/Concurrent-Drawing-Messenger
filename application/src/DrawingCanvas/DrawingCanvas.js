import React, { Component } from 'react';
import './DrawingCanvas.css';
import { Client } from '@stomp/stompjs';
import Line from './Line';
import Message from './Message';
import fetchErr from '../Utils/FetchErr'

class DrawingCanvas extends Component{
    constructor(){
        super();

        //STOMP Client setup
        var stompClient;

        var stompConfig = {
            connectHeaders: {
                login: "guest",
                passcode: "guest"
            },
            brokerURL: "ws://localhost:8080/greeting/websocket",
            reconnectDelay: 200,
            onConnect: (frame) => {
                console.log("Connected");
                const subscription = this.state.stompClient.subscribe("/topic/test/room1", this.handleIncomingMessages);
                this.setState({
                    subscription: subscription
                })
            }
        };

        stompClient = new Client(stompConfig);

        this.state = {
            stompClient: stompClient,
            mouseIsDown: false,
            canvas: null,
            canvasContext: null,
            canvasLastX: 0,
            canvasLastY: 0,
            subscription: null
        };
    }

    componentDidMount = () => {
        // Canvas Setup
        var canvas = document.getElementById('CanvasID');
        var ctx = canvas.getContext('2d');

        //Must add event listeners this way. Adding them directly to the canvas HTML element
        //doesn't connect the mouse event object to the function.
        canvas.addEventListener("mousedown", this.canvasOnMouseDown, false);
        canvas.addEventListener("mouseup", this.canvasOnMouseUp, false);
        canvas.addEventListener("mousemove", this.cavasOnMouseMove, false);

        this.state.stompClient.activate();

        this.setState({
            canvasContext: ctx,
            canvas: canvas
        });
    }

    componentWillUnmount = () => {
        console.log('unscubscribing');
        this.state.subscription.unsubscribe();
    }

    handleIncomingMessages = (message) => {
        console.log(message);
        
        // Parse the message
        const payload = JSON.parse(message.body);
        const content = payload.content;

        // Call the appropriate function based on message type
        switch(payload.type) {
            case "Draw":
                this.drawLine(this.state.canvasContext, content.x1, content.y1, content.x2, content.y2);
                break;
            case "Refresh":
                this.drawImageToCanvas(this.state.canvas, this.state.canvasContext, content);
                break;
            case "Sync":
                this.handleSync(this.state.canvas);
                break;
            default:
                break;
        }
    }

    //Uses a dataURL to draw an image to the canvas
    //Make sure to clear the canvas first to prevent the images from stacking and causing "darkening and blur"
    drawImageToCanvas = (canvas, context, imgDataURL) => {
        var img = new Image();
        img.onload = () => {    
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img,0,0);
        };
        img.src = imgDataURL;
    }

    // Sends a message containing an dataURL representing the current state of the canvas
    handleSync = (canvas) => {
        var canvasDataURL = canvas.toDataURL();
        var message = new Message("Refresh", canvasDataURL);
        this.state.stompClient.publish({destination: "/topic/test/room1", body: JSON.stringify(message)});
    }

    // Drawing functions
    canvasOnMouseDown = (e) => {
        this.setState({
            mouseIsDown: true,
            canvasLastX: e.offsetX,
            canvasLastY: e.offsetY
        })
    }

    // Drawing functions
    canvasOnMouseUp = (e) => {
        this.setState({
            mouseIsDown: false,
            canvasLastX: e.offsetX,
            canvasLastY: e.offsetY
        })
    }

    // Drawing functions
    cavasOnMouseMove = (e) => {
        if(this.state.mouseIsDown){
            var line = new Line(this.state.canvasLastX, this.state.canvasLastY, e.offsetX, e.offsetY);
            var message = new Message("Draw", line);
            this.state.stompClient.publish({destination: "/topic/test/room1", body: JSON.stringify(message)});
            this.setState({
                canvasLastX: e.offsetX,
                canvasLastY: e.offsetY
            })
        }
    }

    // Drawing functions
    drawLine = (context, x1, y1, x2, y2) => {
        context.beginPath();
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.moveTo(x1, y1);
        context.lineTo(x2,y2);
        context.stroke();
        context.closePath();
    };

    testSecured = () => {
        fetchErr('http://localhost:8080/api/secured/subscriptions',
                {method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  'Bearer ' + localStorage.getItem('JWT')
                }
                })
        .then(response => response.json())
        .then(json => {
            json.forEach((canvas, index) => {
                console.log("At index " + index + ": " + canvas.name)
            });
        })
        .catch(err => {
            err.response.json().then(json => console.log(json));
        });
    }   

    render(){
        return(
            <div>
                <canvas id="CanvasID" />
                <h1>dfgdfg</h1>
                <button onClick={this.testSecured}>Test secured</button>
            </div>
        );
    };
}

export default DrawingCanvas