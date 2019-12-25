import {getIP} from "../ipAddress";
import Cookies from "js-cookie";

export async function SetMeetingHTTP(date) {

    let d = date.toString();
    let n = d.split(" ");
    let completeDate = n[0] + " " + n[1] + " " + n[2]+ " " + n[3]
    console.log(completeDate);
    const requestBody = {
        query: `
            mutation{
                setMeeting(date:"${completeDate}")
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
    .then((resData) =>{
        if(resData.data){    
            Cookies.set("GetMeeting", completeDate)
        }
    })
    .catch(err => {
        console.log(err);
    })
}