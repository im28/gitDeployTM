import {getIP} from "../ipAddress";
import Cookies from "js-cookie";

export async function GetPerformanceHTTP() {

    let isSuccess = false;
    const requestBody = {
        query: `
            query{
                getPerformance{
                    title
                    date
                }
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
        if(resData.data.getPerformance){
            Cookies.set("GetPerformances", JSON.stringify(resData.data.getPerformance))
            isSuccess = true;
            console.log(resData.data.getPerformance)
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