const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Gamification = require('../../models/gamification');
const Role = require('../../models/role');
const User = require('../../models/user');
const Experience = require('../../models/experience');
const Meeting = require('../../models/meeting');
const { user } = require('./merge');
const UserInfo = require('../../models/userInfo')

module.exports = {
    addUser: async args => {
        try{
            const existingInfo = await UserInfo.findOne({email: args.userInput.email});
            if (!existingInfo){
                throw new Error('This email is not register yet!')
            }

            const existingUser = await User.findOne({email: args.userInput.username});
            if(existingUser){
                throw new Error('Username already exist!')
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const user = new User({
                username: args.userInput.username,
                password: hashedPassword,
            });

            await user.save()

            const gamification = new Gamification({
                owner: user._id,
                totalRoles: 0,
                points: 0,
                trophies: 0
            })

            const experience = new Experience({
                owner: user._id,
                toastmaster: 0,
                surgentAtArms: 0,
                grammarian: 0,
                ahCounter: 0,
                generalEvaluator: 0,
                topicsMaster: 0,
                timer: 0,
                speeches: 0,
                evaluations: 0
            })

            await gamification.save()
            await experience.save()

            user.gamifications = gamification;
            user.experiences = experience;
            user.information = existingInfo;

            const result = await user.save();

            await UserInfo.updateOne({_id: existingInfo._id}, {owner: user._id});
      
            return {...result._doc, password: null, _id: result.id};
        }
        catch(err) {
                throw err;
        };   
    },
    login: async ({username, password}) => {

        const user = await User.findOne({ username: username});

        if(!user){
            throw new Error('User does not exist');
        }

        const isEqual = await bcrypt.compare(password, user.password);

        if(!isEqual){
            throw new Error('Password is incorrect!');
        }

        const token = jwt.sign({userId: user.id, username: user.username}, 'somesupersecretkey', {
            expiresIn: '1h'
        });

        return { userId: user.id, token: token, tokenExpiration: 1}
    },
    setAdmin: async ({username, isAdmin}, req) => {

        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }

        const user = await User.findOne({ _id: req.userId});

        if(user.isAdmin === 0){
            throw new Error('User not admin!');
        }

        try{
            const existingUser = await User.findOne({username: username});
            if (!existingUser){
                throw new Error('User not found!.')
            }

            existingUser.isAdmin = isAdmin;

            await existingUser.save();
      
            return existingUser;
        }catch(err) {
            throw err;
        };   
    },
    // searchUser: async ({username}) => { // get one existed user without meeting information

    //     const user = await User.findOne({username: username});

    //     if(!user){
    //         throw new Error("Failed to fetch users!")
    //     }

    //     const roles = await Role.find({owner: user._id})

    //     let newRoles = [];

    //     for(let i = 0; i< roles.length;i++){
    //         if(roles[i].status == "Finish"){
    //             newRoles.push(new Role({
    //                 owner: roles[i].owner,
    //                 roleName: roles[i].roleName,
    //                 theme: roles[i].theme,
    //                 date: roles[i].date,
    //                 status: roles[i].status,
    //                 expiryDate: await Meeting.findOne({_id: roles[i].expiryDate._id})
    //             }))
    //         }
    //     }

    //     const sentUser = new User({
    //         username: user.username,
    //         password: user.password,
    //         isAdmin: user.isAdmin,
    //         role: newRoles,
    //         gamifications: await Gamification.findOne({ _id: user.gamifications._id}),
    //         experiences: await Experience.findOne({ _id: user.experiences._id}),
    //         information: await UserInfo.findOne({ _id: user.information._id}),
    //     })
        
    //     return sentUser;
    // },
    searchUser: async ({userId}) => { // get one existed user without meeting information

        const user = await User.findOne({_id: userId});

        if(!user){
            throw new Error("Failed to fetch users!")
        }

        const roles = await Role.find({owner: userId})

        let newRoles = [];

        for(let i = 0; i< roles.length;i++){
            if(roles[i].status == "Finish"){
                newRoles.push(new Role({
                    owner: roles[i].owner,
                    roleName: roles[i].roleName,
                    theme: roles[i].theme,
                    date: roles[i].date,
                    status: roles[i].status,
                    expiryDate: await Meeting.findOne({_id: roles[i].expiryDate._id})
                }))
            }
        }

        const sentUser = new User({
            role: newRoles,
            gamifications: await Gamification.findOne({ _id: user.gamifications._id}),
            information: await UserInfo.findOne({ _id: user.information._id}),
        })
        
        return sentUser;
    },
    getUser: async (args, req) => { // get current user with meeting information

        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }

        const user = await User.findOne({ _id: req.userId});

        if(!user){
            throw new Error('Failed to fetch users!');
        }

        const roles = await Role.find({owner: user._id})

        let newRoles = [];

        for(let i = 0; i< roles.length;i++){
            newRoles.push(new Role({
                owner: roles[i].owner,
                roleName: roles[i].roleName,
                theme: roles[i].theme,
                date: roles[i].date,
                status: roles[i].status,
                expiryDate: await Meeting.findOne({_id: roles[i].expiryDate._id})
            }))
        }

        const sentUser = new User({
            username: user.username,
            password: user.password,
            isAdmin: user.isAdmin,
            pointsGain: user.pointsGain,
            best1: user.best1,
            best2: user.best2,
            best3: user.best3,
            role: newRoles,
            gamifications: await Gamification.findOne({ _id: user.gamifications._id}),
            experiences: await Experience.findOne({ _id: user.experiences._id}),
            information: await UserInfo.findOne({ _id: user.information._id}),
        })
        
        return sentUser;
    },
    updateUser: async ({username, password, email}, req) => {// update member username or password from admin page

        if(username == "" && password == ""){
            throw new Error('No username or password detected!')
        }

        // if(!req.isAuth){
        //     throw new Error('Unauthenticated!');
        // }

        // const admin = await User.findById(req.userId);

        // if(admin.isAdmin === 0){
        //     throw new Error('Only admin can update members username or password!');
        // }

        const userInfo = await UserInfo.findOne({email: email});

        if(!userInfo){
            throw new Error('No information found for email: ' + email)
        }

        const updateUser = await User.findById(userInfo.owner._id)

        if(username != ""){
            await User.updateOne({_id: updateUser._id}, {username: username});
        }
        else if(password != ""){
            const hashedPassword = await bcrypt.hash(password, 12);

            await User.updateOne({_id: updateUser._id}, {password: hashedPassword});
        }

        return "User have been updated!" + username + password
    },
    getAllUser: async () => {  // get current user with meeting information

        const user = await User.find();

        if(!user){
            throw new Error('Failed to fetch users!');
        }

        let newUser = [];

        for(let i = 0; i< user.length;i++){

            let tempRoles = await Role.find({owner: user[i]._id})
            let newRoles = [];

            for(let j = 0; j < tempRoles.length; j++){
                if(tempRoles[j].status == "Finish"){
                    newRoles.push(new Role({
                        owner: tempRoles[j].owner,
                        roleName: tempRoles[j].roleName,
                        theme: tempRoles[j].theme,
                        wordOfTheDay: tempRoles[j].wordOfTheDay,
                        spTitle: tempRoles[j].spTitle,
                        spProjectNo: tempRoles[j].spProjectNo,
                        spPathway: tempRoles[j].spPathway,
                        spObjective: tempRoles[j].spObjective,
                        date: tempRoles[j].date,
                        status: tempRoles[j].status,
                        expiryDate: await Meeting.findOne({_id: tempRoles[j].expiryDate._id})
                    }))
                }
            }

            newUser.push( new User({
                username: user[i].username,
                password: user[i].password,
                role: newRoles,
                gamifications: await Gamification.findOne({owner: user[i]._id}),
                experiences: await Experience.findOne({owner: user[i]._id}),
                information: await UserInfo.findOne({ _id: user[i].information._id})
            }))

        }
        
        return newUser;
    },
    getAllUserName:  async () => {  // get current user with meeting information

        const user = await User.find();

        if(!user){
            throw new Error('Failed to fetch users!');
        }

        let newUser = [];

        for(let i = 0; i < user.length; i++){
            newUser.push( new User({
                _id: user[i]._id,
                information: await UserInfo.findOne({ _id: user[i].information._id})
            }))

        }
        
        return newUser;
    },
    resetFlags: async (arg, req) => {  // get current user with meeting information

        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }

        const user = await User.findById(req.userId);

        if(!user){
            throw new Error('Failed to fetch users!');
        }
        else{
            await User.updateOne({_id: user._id}, {pointsGain: false, best1: false, best2: false, best3: false})
        }
        
        return "Reset flags success!";
    }
}