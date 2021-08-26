import React, { Component } from 'react';
import './DrawingCanvas.css';
import { Client } from '@stomp/stompjs';
import Line from './Line';
import Message from './Message';
import fetchErr from '../../../Utils/FetchErr'
import STOMPKafkaPayload from '../../../Welcome/STOMPKafkaPayload';

class DrawingCanvas extends Component{
    constructor(){
        super();
        this.subscribe();
        this.setState({
            canvasIsPopulated: false
        })
    }

    subscribe = () => {
        var canvasConsumerID;
        //STOMP Client setup
        var stompClient = new Client({
            connectHeaders: {
                login: "guest",
                passcode: "guest"
            },
            brokerURL: "ws://localhost:8080/greeting/websocket",
            //brokerURL: "ws://localhost:8080/greeting",
            reconnectDelay: 200,    
            onStompError: (str) => {
                console.log(str);
            },
            onWebSocketError: (str) => {
                console.log(str);
            },
            onConnect: (frame) => {
                console.log("Connected");
                //This subscription is for listening to draw commands from all users subsrived to the canvas
                const subscription = this.state.stompClient.subscribe("/topic/foo", this.handleIncomingMessages);
                
                fetchErr('http://localhost:8080/api/public/canvasConsumer',
                {method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify("/topic/foo")
                })
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    console.log(json);
                    canvasConsumerID = json;
                    this.setState({
                        canvasConsumerID: canvasConsumerID
                    })
                })
                .catch(error => {
                    console.log(JSON.stringify(error));
                });

                this.setState({
                    subscription: subscription
                })
            }
        });

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

    unsubscribe = () => {
        console.log('unsubscribing');
        console.log(this.state.canvasConsumerID);
        this.state.subscription.unsubscribe();

        console.log(JSON.stringify(this.state.canvasConsumerID));

        fetchErr('http://localhost:8080/api/public/canvasConsumer/delete',
        {method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.canvasConsumerID)
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json);
        })
        .catch(error => {
            console.log(JSON.stringify(error));
        });

        this.setState({
            subscription: null,
            canvasConsumerID: null
        })
    }

/*     getActiveUserCount = async () => {
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
    } */

    handleIncomingMessages = (message) => {     
        
        // Parse the message
        const payload = JSON.parse(message.body);
        const username = payload.key;
        var value = JSON.parse(payload.value)
        const content = value.content;
        const type = value.type;

        // Call the appropriate function based on message type
        switch(type) {
            case "Draw":
                this.drawLine(this.state.canvasContext, content.x1, content.y1, content.x2, content.y2);
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

/*     // Sends a message containing an dataURL representing the current state of the canvas
    handleSync = (canvas) => {
        var canvasDataURL = canvas.toDataURL();
        var message = new Message("Refresh", canvasDataURL);
        this.state.stompClient.publish({destination: "/topic/message/" + this.props.selectedCanvas.canvasID, body: JSON.stringify(message)});
    } */

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
            //replacer necessary to make sure that all of the nested properties (Line's properties) are stringified as well
            var payload = new STOMPKafkaPayload("foo", "username", JSON.stringify(message, function replacer(key,value){return value;}));

            this.state.stompClient.publish({destination: "/app/test", body: JSON.stringify(payload)});

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