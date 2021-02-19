import { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends Component {
    constructor(){
        super();
    }

    render(){
        var isLoggedIn = localStorage.getItem("isLoggedIn");
        console.log("isLoggedIn = " + isLoggedIn)
        if(isLoggedIn === "True"){
            return(
                <Route path={this.props.path} exact={this.props.exact} component={this.props.component}/>
            )
        }
        else{
            return(
                <Redirect to="/login"/>
            )
        }
    }
}

export default PrivateRoute;