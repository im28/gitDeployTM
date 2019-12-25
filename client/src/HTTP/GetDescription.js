import {getIP} from "../ipAddress";
import Cookies from "js-cookie";

export async function GetDescriptionHTTP() {

    let description = "";

    const requestBody = {
        query: `
            query{
                getDescription
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
        if(resData.data.getDescription){
            description = resData.data.getDescription;
            console.log("description")
        }
        else{
            description = "";
        }
    })
    .catch(err => {
        console.log(err);
    })

    return description;
}