import FetchJSONError from './FetchJSONError'

const fetchJSON = (url, options) => {
    //Returns the result of the fetch
    // In case of OK status, returns the body as JSON
    // In case of not OK status, throws an error whose message field is the body as JSON
    return(fetch(url, options)
    .then(response => {
        //OK Status
        if(response.ok){
            return response.json();
        }
        
        //Not OK status
        return response.json().then(json => {
            let err = new FetchJSONError();
            err.responseJSON = json;
            throw err;
        });
    }))
}

export default fetchJSON;