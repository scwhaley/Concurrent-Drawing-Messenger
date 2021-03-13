// This class acts a wrapper class for JS's Error in order to provide easy access to the fetch response
class FetchErrorWrapper extends Error {
    
    constructor(response, ...params) {
      super(...params);
      this.response = response
    }
}

export default FetchErrorWrapper;