import { Switch } from "react-router-dom";
import Page from '../../Utils/Page'
import CanvasSelector from './CanvasSelector/CanvasSelector';
import DrawingCanvas from './DrawingCanvas/DrawingCanvas';

function ContentArea(props){

    var canvasPageTitle = props.selectedCanvas.name + " | WebsiteName";
    return(
        <div className="contentArea">
            <Switch>

                <Page exact path="/main" title="Main | WebsiteName">
                    <CanvasSelector setSelectedCanvas={props.setSelectedCanvas} selectedCanvas={props.selectedCanvas}/>
                </Page>

                <Page path="/main/canvas" title={canvasPageTitle}>
                    <DrawingCanvas selectedCanvas={props.selectedCanvas}/> 
                </Page>

            </Switch>
        </div>
    );
}

export default ContentArea;