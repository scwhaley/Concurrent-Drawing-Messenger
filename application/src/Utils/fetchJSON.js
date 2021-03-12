import FetchJSONError from './FetchJSONError'

const fetchJSON = (url, options) => {
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
            console.log("Got over here")
            console.log(response.status)
            console.log(response)
            let err = new FetchJSONError();
            err.response = response;
            throw err;
        })
    )
}

export default fetchJSON;