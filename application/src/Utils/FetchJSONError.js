class FetchJSONError extends Error {
    
    constructor(responseJSON, ...params) {
      // Pass remaining arguments (including vendor specific ones) to parent constructor
      super(...params);
      this.responseJSON = responseJSON;
    }
}

export default FetchJSONError;