import React, { useState } from 'react'
import { Switch, Route } from "react-router-dom";
import CanvasSelector from './ContentArea/CanvasSelector/CanvasSelector';
import ContentArea from './ContentArea/ContentArea';
import DrawingCanvas from './ContentArea/DrawingCanvas/DrawingCanvas';
import Header from './Header/Header'

function MainSite(){

    var [selectedCanvas, setSelectedCanvas] = useState('');

    if(selectedCanvas !== ''){
        console.log("selectedCanvas !== ''. it equals: " + selectedCanvas);
    }
    return(
        <div className="mainArea">
            <Header/>

            <ContentArea selectedCanvas={selectedCanvas} setSelectedCanvas={setSelectedCanvas}/>

        </div>
    );
}

export default MainSite;