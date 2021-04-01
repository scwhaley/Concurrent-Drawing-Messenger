function CanvasItem(props){
    return(
        <div className="subscribedCanvas" onClick={() => props.onCanvasClick(props.canvasInfo.name)}>
            <div className="canvasItemThumbnail">Thumbnail</div>
            <div className="canvasItemName">{props.canvasInfo.name}</div>
        </div>
    )
}

export default CanvasItem;