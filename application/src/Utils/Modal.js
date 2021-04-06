import { useRef } from "react";

function Modal(props) {

    var modal = useRef(null)

    var modalCloseClick = (event) => {
        if(event.target == modal.current){
            props.setModalOpen(false);
        }
    }

    return(
        <div className='modal' ref={modal} onMouseDown={modalCloseClick}>
            <div className='modalContent'>
                {props.content}
            </div>
        </div>
    )
}

export default Modal;