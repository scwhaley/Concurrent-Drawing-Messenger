import React, { Component } from 'react';
import './DrawingCanvas.css';
import { Client } from '@stomp/stompjs';
import Line from './Line';
import Message from './Message';
import fetchErr from '../../../Utils/FetchErr'

class DrawingCanvas extends Component{
    constructor(){
        super();
        this.subscribe();
        this.setState({
            canvasIsPopulated: false
        })
    }

    componentDidMount = () => {
        // Canvas Setup
        var canvas = document.getElementById('CanvasID');
        var ctx = canvas.getContext('2d');

        //Resize canvas
        canvas.width = 600;
        canvas.height = 600;

        //Must add event listeners this way. Adding them directly to the canvas HTML element
        //doesn't connect the mouse event object to the function.
        canvas.addEventListener("mousedown", this.canvasOnMouseDown, false);
        canvas.addEventListener("mouseup", this.canvasOnMouseUp, false);
        canvas.addEventListener("mousemove", this.cavasOnMouseMove, false);
        canvas.addEventListener("touchstart", this.touchToMouseEventConverted, false);
        canvas.addEventListener("touchend", this.touchToMouseEventConverted, false);
        canvas.addEventListener("touchmove", this.touchToMouseEventConverted, false);
        canvas.addEventListener("touchcancel", this.touchToMouseEventConverted, false);

        this.state.stompClient.activate();

        this.setState({
            canvasContext: ctx,
            canvas: canvas
        });
    }

    //Touch event converter
    //Link was the original code, but i have made a couple modifications for number of touches and reducing number of variables
    //https://stackoverflow.com/questions/1517924/javascript-mapping-touch-events-to-mouse-events
    touchToMouseEventConverted = (e) => {
        //Must be 0 (touchend) or 1 (touchstart and touchmove) touches only. 2 touches should be for zooming, not drawing
        if(e.touches.length <= 1){
            var first = e.changedTouches[0];
            var type = "";
    
            switch(e.type)
            {
                case "touchstart": type = "mousedown"; break;
                case "touchmove":  type = "mousemove"; break;        
                case "touchend":   type = "mouseup";   break;
                default:           return;
            }
            
            var simulatedEvent = document.createEvent("MouseEvent");
            simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                                        first.screenX, first.screenY, 
                                        first.clientX, first.clientY, false, 
                                        false, false, false, 0/*left*/, null);
    
            first.target.dispatchEvent(simulatedEvent);
        }
        //This should prevent mouse event as well, since add event listener has options to false.
        e.preventDefault();
    }

    componentWillUnmount = () => {
        this.unsubscribe();
    }

    subscribe = () => {
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
                //This subscription is for listening to draw commands from all users subsrived to the canvas
                const subscription = this.state.stompClient.subscribe("/topic/message/" + this.props.selectedCanvas.canvasID, this.handleIncomingMessages);
                
                //Check how many users on actively subscribed to the canvas
                this.getActiveUserCount().then((activeUserCount) => {
                    switch(activeUserCount){
                        case 0:
                            //This indicates an issue
                            console.warn("0 active users. Some issue is present.")
                            break;
                        case 1:
                            //This indicates that we are the only person subscribed to the canvas right now.
                            //Pull the canvas state from the DB
                            console.log("First active user. Must pull canvas from DB.")
                            break;
                        default:
                            //This indicates that there is at least one other person subscribed to the canvas.
                            //Synchronize the active canvases instead of pulling from the DB since there could be unsaved changes.
                            console.log("Other active users present. Must sync canvases.")
                            var syncMessage = new Message("Sync", "");
                            this.state.stompClient.publish({destination: "/topic/message/" + this.props.selectedCanvas.canvasID, body: JSON.stringify(syncMessage)})
                            break;
                    }
                })

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

    unsubscribe = () => {
        console.log('unsubscribing');
        this.state.subscription.unsubscribe();
    }

    getActiveUserCount = async () => {
        var url = 'http://localhost:8080/api/secured/canvas/active-users' +'?canvasID=' + this.props.selectedCanvas.canvasID; 
        var response = await fetch(url,
            {method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  'Bearer ' + localStorage.getItem('JWT')
            },
            });

        if (!response.ok){
            throw Error('Could not get active user count. Response Status: ' + response.status + ' ' + response.statusText);
        }

        var json = await response.json();
        console.log("returned from fetch: " + json);
        return json;
    }

    handleIncomingMessages = (message) => {        
        // Parse the message
        const payload = JSON.parse(message.body);
        const content = payload.content;

        // Call the appropriate function based on message type
        switch(payload.type) {
            case "Draw":
                this.drawLine(this.state.canvasContext, content.x1, content.y1, content.x2, content.y2);
                if(!this.state.canvasIsPopulated){
                    this.setState({canvasIsPopulated: true});
                }
                break;
            case "Refresh":
                console.log('Handling Refresh Message');
                this.drawImageToCanvas(this.state.canvas, this.state.canvasContext, content);
                if(!this.state.canvasIsPopulated){
                    this.setState({canvasIsPopulated: true});
                }
                break;
            case "Sync":
                if(this.state.canvasIsPopulated){
                    this.handleSync(this.state.canvas);
                }
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
        this.state.stompClient.publish({destination: "/topic/message/" + this.props.selectedCanvas.canvasID, body: JSON.stringify(message)});
    }

    // Drawing functions
    canvasOnMouseDown = (e) => {
        if(!this.state.mouseIsDown){
            console.log("MouseDown")
            this.setState({
                mouseIsDown: true,
                canvasLastX: e.offsetX,
                canvasLastY: e.offsetY
            })
        }
    }

    // Drawing functions
    canvasOnMouseUp = (e) => {
        if(this.state.mouseIsDown){
        console.log("MouseUp");
            this.setState({
                mouseIsDown: false,
                canvasLastX: e.offsetX,
                canvasLastY: e.offsetY
            })
        }
    }

    // Drawing functions
    cavasOnMouseMove = (e) => {
        if(this.state.mouseIsDown){
            var line = new Line(this.state.canvasLastX, this.state.canvasLastY, e.offsetX, e.offsetY);
            var message = new Message("Draw", line);
            this.state.stompClient.publish({destination: "/topic/message/" + this.props.selectedCanvas.canvasID, body: JSON.stringify(message)});
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
            <div className="canvasContainer">
                <canvas id="CanvasID"/>
            </div>
        );
    };
}

export default DrawingCanvas