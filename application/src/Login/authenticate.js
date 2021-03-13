function checkIfAlreadyLoggedIn(){
    var isLoggedInLocalStorage = localStorage.getItem("isLoggedIn");
    var isLoggedIn = isLoggedInLocalStorage === "True" ? true : false;
    return isLoggedIn;
}

export default checkIfAlreadyLoggedIn;