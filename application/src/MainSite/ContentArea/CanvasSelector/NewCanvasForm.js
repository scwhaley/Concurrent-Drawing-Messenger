function NewCanvasForm () {

    var canvasNameChangeHandler = () => {

    }

    var newCanvasSubmitHandler = () => {

    }

    return(
        <div className="newCanvasFormContainer">
            <form className="newCanvasForm">
                <input className="newCanvasName" type="text" placeholder="Canvas Name" onChange={canvasNameChangeHandler} aria-label="New Canvas Name"></input>
                <button className="submitButton" onClick={newCanvasSubmitHandler}>Create Canvas</button>
            </form>
        </div>
    )
}

export default NewCanvasForm;