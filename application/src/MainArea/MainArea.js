import React, { useState } from 'react'
import { Switch, Route } from "react-router-dom";
import CanvasSelector from '../DrawingCanvas/CanvasSelector';
import DrawingCanvas from '../DrawingCanvas/DrawingCanvas.js';

function MainArea(){

    var [selectedCanvas, setSelectedCanvas] = useState('');

    if(selectedCanvas !== ''){
        console.log("selectedCanvas !== ''. it equals: " + selectedCanvas);
    }
    return(
        <div className="mainArea">
            <h1>Selected Canvas: {selectedCanvas}</h1>
            <Switch>

                <Route exact path="/main">
                    <CanvasSelector setSelectedCanvas={setSelectedCanvas} selectedCanvas={selectedCanvas}/>
                </Route>

                <Route path="/main/canvas">
                    <DrawingCanvas selectedCanvas={selectedCanvas}/> 
                </Route>

            </Switch>
        </div>
    );
}

export default MainArea;