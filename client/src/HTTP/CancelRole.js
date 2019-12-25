import {getIP} from "../ipAddress";
import Cookies from "js-cookie";

export async function CancelRoleHTTP() {

    Cookies.set("Deduct", 1);
    let isSuccess = false;
    const requestBody = {
        query: `
            mutation {
                cancelRoles
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
        if(resData.data.cancelRoles){
            isSuccess = true;
            
            if (resData.data.cancelRoles === "-15") {
                Cookies.set("Deduct", -15);
            }
            console.log(Cookies.get("Deduct"));
            
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