import React, { useEffect, useState } from 'react'
import fetchErr from '../Utils/FetchErr';

function CanvasSelector(props){
    var [canvases, setCanvases] = useState([]);

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
            <li onClick={() => props.setSelectedCanvas(canvas.name)}>{canvas.name}</li>
        );
        console.log(elementList)
        return elementList;
    }


    return(
        <div className="loginPage">
            <ul>
                {canvases}
            </ul>
        </div>
    );
    
}

export default CanvasSelector;