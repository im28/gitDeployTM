import {getIP} from "../ipAddress";
import Cookies from "js-cookie";

export async function GetRolesHTTP() {

    let isSuccess = false;

    const requestBody = {
        query: `
            query{
                getRoles{
                    _id
                    date
                    roleName
                    theme
                    owner {
                        _id
                        information {
                            firstname
                            lastname
                        }
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
        if(resData.data.getRoles){
            Cookies.set("GetRoles", JSON.stringify(resData.data.getRoles))
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