import { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import fetchErr from "./FetchErr";
import GetJWTPayloadDecoded from './GetJWTPayloadDecoded';

function PrivateRoute(props) {
    var jwtIsExpired = false;

    var jwt = localStorage.getItem('JWT');
    var decodedJwtPayload = JSON.parse(GetJWTPayloadDecoded(jwt));

    //JWT expiration is in seconds, but Date expects milliseconds
    const jwtExp = new Date(decodedJwtPayload.exp*1000);
    const now = new Date();

    if (now.getTime() > jwtExp.getTime()){
        console.log("JWT is expired")
        jwtIsExpired = true;
    }

    return(jwtIsExpired ? <Redirect to="/login"/> : <Route path={props.path} exact={props.exact} component={props.component}/>)
}

export default PrivateRoute;