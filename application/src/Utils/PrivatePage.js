import { Redirect } from "react-router-dom";
import GetJWTPayloadDecoded from './GetJWTPayloadDecoded';
import Page from './Page'

function PrivatePage(props) {
    var jwtIsExpired = false;

    var jwt = localStorage.getItem('JWT');

    if (jwt !== null){
        var decodedJwtPayload = JSON.parse(GetJWTPayloadDecoded(jwt));

        //JWT expiration is in seconds, but Date expects milliseconds
        const jwtExp = new Date(decodedJwtPayload.exp*1000);
        const now = new Date();
    
        if (now.getTime() > jwtExp.getTime()){
            console.log("JWT is expired")
            jwtIsExpired = true;
        }
    }

    return( (jwtIsExpired | jwt === null) ? <Redirect to="/login"/> : <Page path={props.path} exact={props.exact} children={props.children} title={props.title}/>)
}

export default PrivatePage;