import React, { useEffect, useState } from 'react'
import { Redirect } from "react-router-dom";
import fetchErr from '../../../Utils/FetchErr';
import './CanvasSelector.css'

function CanvasSelector(props){

    var [canvases, setCanvases] = useState();

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
            <div className="subscribedCanvas" onClick={() => props.setSelectedCanvas(canvas.name)}>{canvas.name}</div>
        );
        console.log(elementList)
        return elementList;
    }

    if(props.selectedCanvas !== ''){
        return <Redirect push to='/main/canvas'/>
    }
    
    return(
        <div className="subscribedCanvasesContainer">
            {canvases}
        </div>
    );
    
}

export default CanvasSelector;