import {getIP} from "../ipAddress";
import Cookies from "js-cookie";

export async function CompleteRolesHTTP() {

    let isSuccess = null;

    const requestBody = {
        query: `
            query{
                getCompletedRoles{
                    roleName
                    theme
                    status
                    date
                    owner{
                        information{
                            firstname
                            lastname
                        }
                    }
                    expiryDate{
                        date
                        status
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
        if(resData.data.getCompletedRoles){
            Cookies.set("CompletedRoles", JSON.stringify(resData.data.getCompletedRoles))

            isSuccess = resData.data.getCompletedRoles;
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