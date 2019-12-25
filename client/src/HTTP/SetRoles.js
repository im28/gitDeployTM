import {getIP} from "../ipAddress";
import Cookies from "js-cookie";

export async function SetRolesHTTP(roleInfo) {

    let isSuccess = false;

    const temp = {
        roleName: roleInfo.roleName,
        theme: roleInfo.theme,
        wordOfTheDay: roleInfo.wordOfTheDay,
        spTitle: roleInfo.spTitle,
        spProjectNo: roleInfo.spProjectNo,
        spPathway: roleInfo.spPathway,
        spObjective: roleInfo.spObjective,
    }

    const requestBody = {
        query: `
            mutation{
                setRoles(roleInput: {roleName: "${temp.roleName}", theme: "${temp.theme}", 
                wordOfTheDay: "${temp.wordOfTheDay}", spTitle: "${temp.spTitle}", spProjectNo: "${temp.spProjectNo}", 
                spPathway: "${temp.spPathway}", spObjective: "${temp.spObjective}"}){
                     _id
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
        if(resData.data.setRoles){

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