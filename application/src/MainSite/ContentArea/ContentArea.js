import { Switch } from "react-router-dom";
import Page from '../../Utils/Page'
import CanvasSelector from './CanvasSelector/CanvasSelector';
import DrawingCanvas from './DrawingCanvas/DrawingCanvas';
import '../ContentArea/ContentArea.css'

function ContentArea(props){

    var canvasPageTitle = props.selectedCanvas.name + " | WebsiteName";
    return(
        <div className="contentArea">
            <Switch>

                <Page exact path="/main" title="Main | WebsiteName">
                    <CanvasSelector setSelectedCanvas={props.setSelectedCanvas} selectedCanvas={props.selectedCanvas}/>
                </Page>

                <Page path="/main/canvas" title={canvasPageTitle}>
                    <div className="drawingCanvasContainer">
                        <h2 className="canvasTitle">{props.selectedCanvas.name}</h2>
                        <DrawingCanvas selectedCanvas={props.selectedCanvas}/> 
                    </div>
                </Page>

            </Switch>
        </div>
    );
}

export default ContentArea;