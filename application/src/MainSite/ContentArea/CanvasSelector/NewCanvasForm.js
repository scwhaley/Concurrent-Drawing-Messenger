import './NewCanvasForm.css'

function NewCanvasForm () {

    var canvasNameChangeHandler = (event) => {

    }

    var newCanvasSubmitHandler = (event) => {
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