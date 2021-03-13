import FetchErrorWrapper from './FetchErrorWrapper'

const fetchErr = (url, options) => {
    //Returns the result of the fetch
    // In case of OK status, returns the response
    // In case of not OK status, throws an error whose message field is the body as JSON
    return(fetch(url, options)
        .then(response => {
            console.log("response.ok = " + response.ok)
            //OK Status
            if(response.ok){
                return response;
            }
            
            //Not OK Status
            let err = new FetchErrorWrapper();
            err.response = response;
            throw err;
        })
    )
}

export default fetchErr;