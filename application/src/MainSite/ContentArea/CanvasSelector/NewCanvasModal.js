import { useEffect, useState } from "react";
import Modal from "../../../Utils/Modal";
import './NewCanvas.css'
import NewCanvasForm from "./NewCanvasForm";

function NewCanvasModal(props) {

    var [modalIsOpen, setModalOpen] = useState(false);

    //This must be present to reset the flag so that a transition occurs for the useEffect in CanvasSelector
    useEffect(() => {
        if(!modalIsOpen){
            props.setNewCanvasCreated(false);
        }
    },[modalIsOpen])


    return (
        <>
            <div className="subscribedCanvas newCanvasSelection" onClick={() => setModalOpen(true)}>
                <div className="canvasItemThumbnail">+</div>
            </div>
            {modalIsOpen ? <Modal setModalOpen={setModalOpen} content={<NewCanvasForm setModalOpen={setModalOpen} setNewCanvasCreated={props.setNewCanvasCreated}/>}/> : null }
        </>
    )
}

export default NewCanvasModal;