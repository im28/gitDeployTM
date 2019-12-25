import {getIP} from "../ipAddress";
import Cookies from "js-cookie";

export async function CompleteMeetingHTTP(best1, best2, best3) {

    let best = ["", "", ""];
    let isSuccess = false;
    console.log(best1,best2,best3);
    if(best1){
        best[0] = best1;
    }

    if(best2){
        best[1] = best2;
    }

    if(best3){
        best[2] = best3;
    }
    console.log(best);
    
    let requestBody = {
        query: `
            mutation{
                meetingComplete(best1: "${best[0]}", best2: "${best[1]}", best3: "${best[2]}")
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
        if(resData.data.meetingComplete){
            isSuccess = true;
            Cookies.set("GetMeeting", "No meeting!!");
            
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