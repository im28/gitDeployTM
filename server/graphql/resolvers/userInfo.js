const UserInfo = require('../../models/userInfo')

module.exports = {
    register: async args => {
        try{
            const existingUser = await UserInfo.findOne({email: args.userInfoInput.email});

            if (existingUser){
                throw new Error('User exists already.')
            }

                const userInfo = new UserInfo({
                    lastname: args.userInfoInput.lastname,
                    firstname: args.userInfoInput.firstname,
                    middlename: args.userInfoInput.middlename,
                    email: args.userInfoInput.email,
                    phone: args.userInfoInput.phone,
                    organization: args.userInfoInput.organization,
                    addressOne: args.userInfoInput.addressOne,
                    addressTwo: args.userInfoInput.addressTwo,
                    postcode: args.userInfoInput.postcode,
                    photo: args.userInfoInput.photo
                });
                await userInfo.save();
      
                return "Register successfully!";
            }catch(err) {
                throw err;
            };   
    },
    updateInfo: async (args, req) => { // Update current user infomation
        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }

        const existingInfo = await UserInfo.findOne({owner: req.userId});

        try{
            const newInfo = new UserInfo({
                lastname: args.userInfoInput.lastname != "" ? args.userInfoInput.lastname : existingInfo.lastname,
                firstname: args.userInfoInput.firstname != "" ? args.userInfoInput.firstname : existingInfo.firstname,
                middlename: args.userInfoInput.middlename != "" ? args.userInfoInput.middlename : existingInfo.middlename,
                email: args.userInfoInput.email != "" ? args.userInfoInput.email : existingInfo.email,
                phone: args.userInfoInput.phone != "" ? args.userInfoInput.phone : existingInfo.phone,
                organization: args.userInfoInput.organization != "" ? args.userInfoInput.organization : existingInfo.organization,
                addressOne: args.userInfoInput.addressOne != "" ? args.userInfoInput.addressOne : existingInfo.addressOne,
                addressTwo: args.userInfoInput.addressTwo != "" ? args.userInfoInput.addressTwo : existingInfo.addressTwo,
                postcode: args.userInfoInput.postcode != "" ? args.userInfoInput.postcode : existingInfo.postcode,
                photo: args.userInfoInput.photo != "" ? args.userInfoInput.photo : existingInfo.photo
            });

            await UserInfo.updateOne({_id: existingInfo._id}, newInfo);
      
            return "User information have been updated!";
        }
        catch(err) {
            throw err;
        };   
    }
}