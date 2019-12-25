import {getIP} from "../ipAddress";
// import Cookies from "js-cookie";

export async function GetAllUserNameHTTP() {

    let isSuccess = null;

    const requestBody = {
        query: `
            query{
                getAllUserName{
                    _id
                    information{
                        firstname
                        lastname
                        middlename
                    }
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
        if(resData.data.getAllUserName){
            isSuccess = resData.data.getAllUserName;
        }
        else{
            isSuccess = null;
        }
    })
    .catch(err => {
        console.log(err);
    })

    return isSuccess;
}