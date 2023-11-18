import  { jwtDecode } from "jwt-decode";

export function decodeJWT(token){
    var decoded = jwtDecode(token);
    return decoded
}