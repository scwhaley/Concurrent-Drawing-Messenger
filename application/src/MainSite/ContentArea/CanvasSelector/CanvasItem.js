function CanvasItem(props){
    return(
        <div className="subscribedCanvas" onClick={() => props.onCanvasClick(props.canvas.name)}>
            <div className="canvasItemThumbnail">Thumbnail</div>
            <div className="canvasItemName">{props.canvas.name}</div>
        </div>
    )
}

export default CanvasItem;