export function authenticate(){
    var isLoggedIn = checkIfAlreadyLoggedIn();
    //If already logged in, return true. Else try to authenticate.
    if(isLoggedIn){
        return true;
    }
    else{
        //Try to authenticate with credentials using server
        //If success
            //Mock successful authentication
            localStorage.setItem("isLoggedIn", "True");
            console.log("Created isLoggedIn and set to True")
            return true;
        //If failure
            //TODO
            //return false;
    }
}

export function checkIfAlreadyLoggedIn(){
    var isLoggedInLocalStorage = localStorage.getItem("isLoggedIn");
    var isLoggedIn = isLoggedInLocalStorage === "True" ? true : false;
    return isLoggedIn;
}