import React, { Component } from 'react';
import './DrawingCanvas.css';
import { Client } from '@stomp/stompjs';
import Line from './Line'

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
                const subscription = this.state.stompClient.subscribe("/topic/test", this.handleIncomingDrawCommands)
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

    handleIncomingDrawCommands = (message) => {
        const payload = JSON.parse(message.body);
        this.drawLine(this.state.canvasContext, payload.x1, payload.y1, payload.x2, payload.y2);
    }

    canvasOnMouseDown = (e) => {
        this.setState({
            mouseIsDown: true,
            canvasLastX: e.offsetX,
            canvasLastY: e.offsetY
        })
    }

    canvasOnMouseUp = (e) => {
        this.setState({
            mouseIsDown: false,
            canvasLastX: e.offsetX,
            canvasLastY: e.offsetY
        })
    }

    cavasOnMouseMove = (e) => {
        if(this.state.mouseIsDown){
            var line = new Line(this.state.canvasLastX, this.state.canvasLastY, e.offsetX, e.offsetY);
            this.state.stompClient.publish({destination: "/app/message", body: JSON.stringify(line)});
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
                <canvas id="CanvasID" />
            </div>
        );
    };
}

export default DrawingCanvas