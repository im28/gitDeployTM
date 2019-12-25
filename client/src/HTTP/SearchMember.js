import {getIP} from "../ipAddress";

export async function SearchMemberHTTP(userId) {

    //let isSuccess = false;
    let userInformatin = null

    const requestBody = {
        query: `
            query{
                searchUser(userId: "${userId}"){
                    information{
                        firstname
                        lastname
                        email
                    }
                    role{
                        roleName
                        expiryDate{
                            date
                        }
                    }
                    gamifications{
                        points
                        totalRoles
                        trophies
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
        if(resData.data.searchUser){

            //isSuccess = true;
            userInformatin = resData.data.searchUser;
        }
        else{
            //isSuccess = false;
            userInformatin = null;
        }
    })
    .catch(err => {
        console.log(err);
    })

    return userInformatin;
}