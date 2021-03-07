import React from 'react'

function SignupError(props) {
    if(props.submitError){
        return(
            <div>
                <h3>{props.errorMessage}</h3>
            </div>
            )}
    else{
        return null;
    }
}

export default SignupError;