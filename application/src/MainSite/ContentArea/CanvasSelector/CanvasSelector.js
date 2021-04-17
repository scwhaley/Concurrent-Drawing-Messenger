import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from "react-router-dom";
import fetchErr from '../../../Utils/FetchErr';
import './CanvasSelector.css'
import './CanvasItem'
import CanvasItem from './CanvasItem';
import NewCanvasModal from './NewCanvasModal';

function CanvasSelector(props){

    var [canvases, setCanvases] = useState();
    var [newCanvasCreated, setNewCanvasCreated] = useState(false);
    var history = useHistory();

    useEffect(() => {
        fetchErr('http://localhost:8080/api/secured/subscribed-canvas',
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
    }, [newCanvasCreated])

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
        <>
            <h1 className="canvasSelectorTitle">Recent canvases</h1>
            <div className="subscribedCanvasesContainer">
                {canvases}
                <NewCanvasModal setNewCanvasCreated={setNewCanvasCreated}/>
            </div>
        </>

    );
    
}

export default CanvasSelector;