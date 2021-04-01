import { Switch, Route } from "react-router-dom";
import CanvasSelector from './CanvasSelector/CanvasSelector';
import DrawingCanvas from './DrawingCanvas/DrawingCanvas';

function ContentArea(props){

    return(
        <div className="contentArea">
            <Switch>

                <Route exact path="/main">
                    <CanvasSelector setSelectedCanvas={props.setSelectedCanvas} selectedCanvas={props.selectedCanvas}/>
                </Route>

                <Route path="/main/canvas">
                    <DrawingCanvas selectedCanvas={props.selectedCanvas}/> 
                </Route>

            </Switch>
        </div>
    );
}

export default ContentArea;