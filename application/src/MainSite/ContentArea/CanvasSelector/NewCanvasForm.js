import './NewCanvasForm.css'
import {useState} from 'react'
import fetchErr from '../../../Utils/FetchErr';

function NewCanvasForm () {

    var [canvasName, setCanvasName] = useState();

    var canvasNameChangeHandler = (event) => {
        setCanvasName(event.target.value)
    }

    var newCanvasSubmitHandler = (event) => {
        console.log('Clicked')
        fetchErr("http://localhost:8080/api/secured/canvas",
                {method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  'Bearer ' + localStorage.getItem('JWT')
                },
                body: JSON.stringify(canvasName)
                })
        .then(response => response.json())
        .then(canvas => {
            console.log("returned from fetch: " + canvas)
        })
        .catch(err => {
            err.response.json().then(json => console.log(json));
        });

        event.preventDefault();
    }

    return(
        <div className="newCanvasFormContainer">
            <h2>Create a new canvas</h2>
            <form className="newCanvasForm">
                <input className="newCanvasName" type="text" placeholder="Canvas Name" onChange={canvasNameChangeHandler} aria-label="New Canvas Name"></input>
                <button className="submitButton" onClick={newCanvasSubmitHandler}>Create Canvas</button>
            </form>
        </div>
    )
}

export default NewCanvasForm;