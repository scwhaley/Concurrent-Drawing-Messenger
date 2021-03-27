function GetJWTPayloadDecoded(jwt){
    return atob(jwt.split(".")[1])
}

export default GetJWTPayloadDecoded;