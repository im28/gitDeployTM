import {getIP} from "../ipAddress";
import Cookies from "js-cookie";

export async function UserHTTP() {

    let isSuccess = false;

    let requestBody = {
        query: `
            query{
                getUser{
                    isAdmin
                    pointsGain
                    best1
                    best2
                    best3
                    gamifications{
                        totalRoles
                        trophies
                        points
                    }
                    experiences{
                        toastmaster
                        surgentAtArms
                        grammarian
                        ahCounter
                        generalEvaluator
                        topicsMaster
                        timer
                        speeches
                        evaluations
                    }
                    information{
                        firstname
                        lastname
                        middlename
                        email
                    }
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
        if(resData.data.getUser){
            Cookies.set("isAdmin", JSON.stringify(resData.data.getUser.isAdmin))
            Cookies.set("gamification", JSON.stringify(resData.data.getUser.gamifications));
            Cookies.set("experience", JSON.stringify(resData.data.getUser.experiences));
            Cookies.set("information", JSON.stringify(resData.data.getUser.information))
            const f ={ 
                best1:(resData.data.getUser.best1) ,
                best2:(resData.data.getUser.best2),
                best3:(resData.data.getUser.best3),
                pointsGain:(resData.data.getUser.pointsGain)
            }
            Cookies.set("flags", JSON.stringify(f))
            console.log(resData.data.getUser);
            
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