import { useState } from "react";
import Modal from "../../../Utils/Modal";
import './NewCanvas.css'
import NewCanvasForm from "./NewCanvasForm";

function NewCanvas(props) {

    var [modalIsOpen, setModalOpen] = useState(false);

    return (
        <>
            <div className="subscribedCanvas newCanvasSelection" onClick={() => setModalOpen(true)}>
                <div className="canvasItemThumbnail">+</div>
            </div>
            {modalIsOpen ? <Modal setModalOpen={setModalOpen} content={<NewCanvasForm/>}/> : null }
        </>
    )
}

export default NewCanvas;