import {getIP} from "../ipAddress";

export async function RegisterHTTP(information) {

    let isSuccess = false;

    let requestBody = {
        query: `
            mutation{
                register(userInfoInput:{lastname: "${information.lastname}", 
                firstname: "${information.firstname}", email: "${information.email}", 
                middlename: "${information.middlename}", phone: "${information.phone}" ,
                organization: "${information.orgnization}", addressOne: "${information.addressOne}", 
                addressTwo: "${information.addressTwo}", postcode: "${information.postalCode}"})
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
        if(!resData.data.register){
            isSuccess = false;
        } 
        else{
            isSuccess = true;
        }
    })
    .catch(err => {
        console.log(err);
    })

    return isSuccess;
}