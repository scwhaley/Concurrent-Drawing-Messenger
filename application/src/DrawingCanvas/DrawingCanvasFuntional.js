import React, { useState, useEffect } from 'react';
import './DrawingCanvas.css';
import { Client } from '@stomp/stompjs';
import Line from './Line'
import Message from './Message'

function DrawingCanvasFunctional(){
    var [stompClient, setStompClient] = useState();
    var [mouseIsDown, setMouseDown] = useState(false);
    var [canvas, setCanvas] = useState();
    var [canvasContext, setCanvasContext] = useState();
    var [canvasLastX, setCanvasLastX] = useState(0);
    var [canvasLastY, setCanvasLastY] = useState(0);

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
            const subscription = this.state.stompClient.subscribe("/topic/test/room1", this.handleIncomingMessages);
        }
    };

    var stompClient = new Client(stompConfig);

    // Run when canvas or StompClient changes
    useEffect(() => {
        // Canvas Setup
        var canvas = document.getElementById('CanvasID');
        var ctx = canvas.getContext('2d');

        //Must add event listeners this way. Adding them directly to the canvas HTML element
        // does connect the mouse event object to the function.
        canvas.addEventListener("mousedown", this.canvasOnMouseDown, false);
        canvas.addEventListener("mouseup", this.canvasOnMouseUp, false);
        canvas.addEventListener("mousemove", this.cavasOnMouseMove, false);

        this.state.stompClient.activate();

        this.setState({
            canvasContext: ctx,
            canvas: canvas
        });
    },[canvas, stompClient])
    
}

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
            }
        };

        stompClient = new Client(stompConfig);

        this.state = {
            stompClient: stompClient,
            mouseIsDown: false,
            canvas: null,
            canvasContext: null,
            canvasLastX: 0,
            canvasLastY: 0
        };
    }

    componentDidMount = () => {
        // Canvas Setup
        var canvas = document.getElementById('CanvasID');
        var ctx = canvas.getContext('2d');

        //Must add event listeners this way. Adding them directly to the canvas HTML element
        // does connect the mouse event object to the function.
        canvas.addEventListener("mousedown", this.canvasOnMouseDown, false);
        canvas.addEventListener("mouseup", this.canvasOnMouseUp, false);
        canvas.addEventListener("mousemove", this.cavasOnMouseMove, false);

        this.state.stompClient.activate();

        this.setState({
            canvasContext: ctx,
            canvas: canvas
        });
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
                this.drawImageToCanvas(content);
                break;
            case "Sync":
                this.handleSync();
                break;
            default:
                break;
        }
    }

    // Uses a dataURL to draw an image to the canvas
    drawImageToCanvas = (imgDataURL) => {
        var img = new Image();
        img.onload = () => {
            this.state.canvasContext.drawImage(img,0,0);
        };
        img.src = imgDataURL;
    }

    // Sends a message containing an dataURL representing the current state of the canvas
    handleSync = () => {
        var canvasDataURL = this.state.canvas.toDataURL();
        var message = new Message("Refresh", canvasDataURL);
        this.state.stompClient.publish({destination: "/app/message/room1", body: JSON.stringify(message)});
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
            this.state.stompClient.publish({destination: "/app/message/room1", body: JSON.stringify(message)});
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

    render(){
        return(
            <div>
                <canvas id="CanvasID" />
                <h1>dfgdfg</h1>
            </div>
        );
    };
}

export default DrawingCanvas