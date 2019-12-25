import {getIP} from "../ipAddress";
import Cookies from "js-cookie";

export async function UpdateUserHTTP(username, password, email) {

    let isSuccess = false;

    // if(username === ""){
    //     username = null
    // }
    // else if(password === ""){
    //     password = null
    // }

    const requestBody = {
        query: `
            mutation{
                updateUser(username: "${username}", password: "${password}", email: "${email}")
            }
        `
    };

    await fetch(getIP(), {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get("token")
        }
    })
    .then(res =>{
        if(res.status !== 200 && res.status !== 201){
            throw new Error('Failed');
        }
        return res.json();
    })
    .then(resData =>{
        if(resData.data.updateUser){

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