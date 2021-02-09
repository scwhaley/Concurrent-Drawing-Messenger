import React, { Component } from 'react';
import './DrawingCanvas.css';
import { Client } from '@stomp/stompjs';

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

            debug: (str) => {console.log("Stomp: " + str)},

            reconnectDelay: 200,

            onConnect: (frame) => {
                console.log("Connected. Frame: " + frame);

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
        this.setState({
            canvasContext: ctx,
            canvas: canvas
        });
    }

    ConnectClick = () => {
        this.state.stompClient.activate();
    }

    SubscribeClick = () => {
        console.log("Subscribing to /topic/test...");
        const subscription = this.state.stompClient.subscribe("/topic/test", (message) => {
            //const payload = JSON.parse(message.body);
            console.log("Recieved message from subscription. Response body: " + message.body);
        })
    };

    SendClick = () => {
        console.log(this.state.stompClient);
        this.state.stompClient.publish({destination: "/app/message", body: "Hello, STOMP"});
    }

    canvasOnMouseDown = (e) => {
        console.log("canvasOnMouseDown event called");
        this.setState({mouseIsDown: true});
        this.setState({
            canvasLastX: e.offsetX,
            canvasLastY: e.offsetY
        })
    }

    canvasOnMouseUp = (e) => {
        console.log("canvasOnMouseUp event called");
        this.setState({mouseIsDown: false});
        this.setState({
            canvasLastX: e.offsetX,
            canvasLastY: e.offsetY
        })
    }

    cavasOnMouseMove = (e) => {
        if(this.state.mouseIsDown){
            console.log("canvasOnMouseMove event called. (" + e.offsetX + ", " + e.offsetY + ")");
            this.drawLine(this.state.canvasContext, this.state.canvasLastX, this.state.canvasLastY, e.offsetX, e.offsetY);
            this.setState({
                canvasLastX: e.offsetX,
                canvasLastY: e.offsetY
            })
        }
    }

    drawLine = (context, x1, y1, x2, y2) => {
        context.beginPath();
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.moveTo(x1, y1);
        context.lineTo(x2,y2);
        context.stroke();
        context.closePath();
    }

    render(){
        return(
            <div>
                <button onClick={this.ConnectClick}>Connect</button>
                <button onClick={this.SubscribeClick}>Subscribe</button>
                <button onClick={this.SendClick}>Send Message</button>
                <canvas id="CanvasID" />
            </div>
        );
    };
}

export default DrawingCanvas