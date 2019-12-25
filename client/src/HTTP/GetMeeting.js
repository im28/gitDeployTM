import {getIP} from "../ipAddress";
import Cookies from "js-cookie";

export async function GetMeetingHTTP() {

    let isSuccess = false;

    const requestBody = {
        query: `
           query{
               getMeeting{
                   date
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
        if(resData.data.getMeeting){
            Cookies.set("GetMeeting", resData.data.getMeeting.date)
            isSuccess = true;
        }
        else{
            Cookies.set("GetMeeting", "No meeting!!")
            isSuccess = false;
        }
    })
    .catch(err => {
        console.log(err);
    })

    return isSuccess;
}