class FetchJSONError extends Error {
    
    constructor(response, responseBodyJSON, ...params) {
      // Pass remaining arguments (including vendor specific ones) to parent constructor
      super(...params);
      this.response = response
      this.responseBodyJSON = responseBodyJSON;
    }
}

export default FetchJSONError;