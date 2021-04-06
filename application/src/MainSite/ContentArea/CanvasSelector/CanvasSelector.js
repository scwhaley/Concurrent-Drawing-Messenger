import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from "react-router-dom";
import fetchErr from '../../../Utils/FetchErr';
import './CanvasSelector.css'
import './CanvasItem'
import CanvasItem from './CanvasItem';
import NewCanvas from './NewCanvas';

function CanvasSelector(props){

    var [canvases, setCanvases] = useState();
    var history = useHistory();

    useEffect(() => {
        fetchErr('http://localhost:8080/api/secured/subscriptions',
                {method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  'Bearer ' + localStorage.getItem('JWT')
                }
                })
        .then(response => response.json())
        .then(json => {
            console.log("returned from fetch: " + json)
            var listItems = canvasListToListItems(json);
            console.log('listItems count = ' + listItems.count)
            setCanvases(listItems);
        })
        .catch(err => {
            err.response.json().then(json => console.log(json));
        });
    }, [])

    var canvasListToListItems = (canvasList) => {
        var elementList = canvasList.map((canvas) => 
            <CanvasItem key={canvas.canvasID} canvas={canvas} onCanvasClick={() => onCanvasClick(canvas)}/>
        );
        console.log(elementList)
        return elementList;
    }
    
    var onCanvasClick = (canvas) => {
        props.setSelectedCanvas(canvas);
        history.push('/main/canvas');
    };
    
    return(
        <div>
            <h1>Recent canvases</h1>
            <div className="subscribedCanvasesContainer">
                {canvases}
                <NewCanvas/>
            </div>
        </div>

    );
    
}

export default CanvasSelector;