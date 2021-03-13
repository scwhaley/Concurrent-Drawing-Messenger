import { Route, Redirect } from "react-router-dom";
import checkIfAlreadyLoggedIn from "../Login/authenticate"

function PrivateRoute(props) {
    var isLoggedIn = checkIfAlreadyLoggedIn();
    return(isLoggedIn ? <Route path={props.path} exact={props.exact} component={props.component}/> : <Redirect to="/login"/>)
}

export default PrivateRoute;