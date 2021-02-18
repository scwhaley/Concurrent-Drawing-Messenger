import { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends Component {
    constructor(){
        super();
    }

    render(){
        console.log("this.props.isLoggedIn is " + this.props.isLoggedIn);
        if(this.props.isLoggedIn === true){
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