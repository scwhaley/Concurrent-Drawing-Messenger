import fetchJSON from "../Utils/FetchJSON";

export function authenticate(user){
    

}

export function checkIfAlreadyLoggedIn(){
    var isLoggedInLocalStorage = localStorage.getItem("isLoggedIn");
    var isLoggedIn = isLoggedInLocalStorage === "True" ? true : false;
    return isLoggedIn;
}