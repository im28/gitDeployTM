import {getIP} from "../ipAddress";
import Cookies from "js-cookie";

export async function LoginHTTP(auth) {

    let isSuccess = false;

    let requestBody = {
        query: `
            query{
                login(username: "${auth.username}", password: "${auth.password}"){
                    userId
                    token
                    tokenExpiration
                }
            }
        `
    };

    await fetch(getIP(), {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res =>{
        if(res.status !== 200 && res.status !== 201){
            throw new Error('Failed');
        }
        return res.json();
    })
    .then(resData =>{
        if(resData.data.login.token){
            Cookies.set("token", resData.data.login.token);
            Cookies.set("userId", resData.data.login.userId);
            Cookies.set("tokenExpiration", resData.data.login.tokenExpiration)

            isSuccess = true;
        }
        else{
            isSuccess = false;
        }
    })
    .catch(err => {
        console.log(err);
    })

    return isSuccess;
}