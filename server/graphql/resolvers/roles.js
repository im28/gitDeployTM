const Role = require('../../models/role');
const { user } = require('./merge');
const User = require('../../models/user');
const Gamification = require('../../models/gamification');
const Meeting = require('../../models/meeting');
const UserInfo = require('../../models/userInfo')

const transformEvent = role => {
    return{
        ...role._doc,
        _id: role.id,
        //date: new Date(role._doc.date).toISOString(),
        owner: user.bind(this, role.owner),
        status: role.status
        //owner: user.bind(this, "5dbd9dc6a97572399030f360")
    }
}

Date.daysBetween = function( date1, date2 ) {
    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;
  
    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
  
    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;
      
    // Convert back to days and return
    return Math.round(difference_ms / one_day); 
}

module.exports = {
    roles: async () => { // return every roles
        try{
            const roles = await Role.find();
            return roles.map(role =>{
                return transformEvent(role);;
            });
        }
        catch(err) {
            throw err;
        }
    },
    setRoles: async (args, req) => { // set role for current user
        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }
        // "5dcdb61ed3a2f222c00e0137"
        const date = new Date().toString();
        const newDate = date.split(' ')[0] + " " + date.split(' ')[1] + " " + date.split(' ')[2] + " " + date.split(' ')[3];
        const rolesArray = await Role.find({owner: req.userId});

        const checkIfAny = await Role.find({status: "Ongoing"});

        if(checkIfAny){
            for(let i = 0; i<checkIfAny.length;i++){
                if(checkIfAny[i].roleName == args.roleInput.roleName){
                    throw new Error("This roles already taken!")
                }
            }
        }

        if(rolesArray){
            for(var i=0;i<rolesArray.length;i++){
                if(rolesArray[i].status == "Ongoing"){
                    throw new Error("There already ongoing role for this user!")
                }
            }
        }

        const meeting = await Meeting.findOne({status: "Ongoing"})

        if(!meeting){
            throw new Error("No meeting ongoing right now! ")
        }
        
        const role = new Role({
            owner: req.userId,
            roleName: args.roleInput.roleName,
            theme: args.roleInput.theme,
            wordOfTheDay: args.roleInput.wordOfTheDay,
            spTitle: args.roleInput.spTitle,
            spProjectNo: args.roleInput.spProjectNo,
            spPathway: args.roleInput.spPathway,
            spObjective: args.roleInput.spObjective,
            date: newDate,
            expiryDate: meeting._id
        });
        
        let setRoles;
        try{
            const result = await role
            .save()
                setRoles = transformEvent(result);
                const owner = await User.findById(req.userId);
                //const owner = await User.findById("5dbd9dc6a97572399030f360");
                if (!owner){
                    throw new Error('User not found.')
                }
                owner.role.push(role);
                await owner.save();

                meeting.setRole.push(role);
                await meeting.save();
 
                return setRoles;
        }catch(err) {
            console.log(err);
            throw err;
        };
    },
    getRoles: async () => { // return array of ongoing roles only
        try{
            const roles = await Role.find({status: "Ongoing"});
            let role = []

            if(!roles){
                throw new Error('No roles ongoing right now!');
            }

            for(let i = 0;i<roles.length;i++){
                role.push(
                    new Role({
                        owner: await User.findOne({ _id: roles[i].owner._id}),
                        roleName: roles[i].roleName,
                        theme: roles[i].theme,
                        wordOfTheDay: roles[i].wordOfTheDay,
                        spTitle: roles[i].spTitle,
                        spProjectNo: roles[i].spProjectNo,
                        spPathway: roles[i].spPathway,
                        spObjective: roles[i].spObjective,
                        date: roles[i].date,
                        status: roles[i].status,
                        expiryDate: await Meeting.findOne({_id: roles[i].expiryDate._id})
                    })
                )
            }

            let filterRole = []

            for(let i = 0; i < role.length; i++){
                filterRole.push({
                    ...role[i]._doc,
                    owner: {
                        _id: role[i].owner._id,
                        information: await UserInfo.findOne({_id: role[i].owner.information._id})
                    }
                })
            }

            return filterRole
        }
        catch(err) {
            throw err;
        }
    },
    cancelRoles: async (args, req) => {// cancel role for the current user
        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }

        const owner = await User.findById(req.userId);

        if(!owner){
            throw new Error("User not found!");
        }
        
        let deductedValue;

        const meeting = await Meeting.findOne({status: "Ongoing"})

        if(!meeting){
            throw new Error("No ongoing meeting!")
        }

        const totalDay = Date.daysBetween(new Date(), new Date(meeting.date));

        if(totalDay < 3){ // if cancel less than 3 days, deduct point
            deductedValue = 15
        }
        else{
            deductedValue = 0
        }

        console.log("Deducted value: " + deductedValue + " pts")
        
        const rolesArray = await Role.find({owner: req.userId});

        let check = false;
        
        try{
            if(rolesArray){
                for(let i=0;i<rolesArray.length;i++){
                    if(rolesArray[i].status == "Ongoing"){

                        await rolesArray[i].deleteOne( { status: "Ongoing" } )
                        await owner.role.pull({_id: rolesArray[i]._id}) // remove id of deleted role from user roles
                        const gamification = await Gamification.findOne({owner: req.userId});
                        if(gamification){
                            let newPoint = gamification.points - deductedValue;
                            if(newPoint < 0) newPoint = 0;
                            await Gamification.updateOne({owner: req.userId}, {points: newPoint});
                        }
                        return deductedValue
                    }
                }
            }
            if(!check){
                throw new Error("Roles for this date not exist")
            }
        }
        catch(err) {
            throw err;
        }
    },
    getCompletedRoles: async () => { // return array of finish roles only
        try{
            const meeting = await Meeting.find({status: "Finish"});
            const roles = await Role.find({status: "Finish"});
            let role = []
            
            if(!meeting){
                throw new Error("No finish meeting found!");
            }
            if(!roles){
                throw new Error("No finish roles found!");
            }
            if(!meeting){
                throw new Error("No owner of finish found!");
            }

            for(let i = 0;i<roles.length;i++){
                role.push(
                    new Role({
                        owner: await User.findOne({ _id: roles[i].owner._id}),
                        roleName: roles[i].roleName,
                        theme: roles[i].theme,
                        wordOfTheDay: roles[i].wordOfTheDay,
                        spTitle: roles[i].spTitle,
                        spProjectNo: roles[i].spProjectNo,
                        spPathway: roles[i].spPathway,
                        spObjective: roles[i].spObjective,
                        date: roles[i].date,
                        status: roles[i].status,
                        expiryDate: await Meeting.findOne({_id: roles[i].expiryDate._id})
                    })
                )
            }

            let filterRole = []

            for(let i = 0; i < role.length; i++){
                filterRole.push({
                    ...role[i]._doc,
                    owner: {
                        information: await UserInfo.findOne({_id: role[i].owner.information._id})
                    }
                })
            }

            return filterRole
        }
        catch(err) {
            throw err;
        }
    },
    getDescription: async (args, req) => {

        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }
        
        const roles = await Role.findOne({owner: req.userId, status: "Ongoing"});

        if(!roles){
            throw new Error("No Ongoing roles found for userId: " + req.userId)
        }

        const roledescriptions = {
            "Toastmaster of the evening": "The Toastmaster is a meeting's director and host.",
            "Surgent At Arms": "The Sergeant at Arms handles meeting facilities and decorum.",
            "Grammarian": "The Grammarian helps club members improve their grammar and vocabulary.",
            "Ah-Counter": "The purpose of the Ah-Counter is to note any overused words or filler sounds.", 
            "General Evaluator": "The General Evaluator evaluates everything that takes place during the club meeting.",
            "Topic Master": "Taking on this role improves organization skills, time management and facilitation skills.",
            "Timer": "Taking on this role improves time management skills.",
            "Speaker 1": "Every speaker is a role model and club members learn from one another's speeches.",
            "Speaker 2": "Every speaker is a role model and club members learn from one another's speeches.",
            "Speaker 3": "Every speaker is a role model and club members learn from one another's speeches.",
            "Speaker 4": "Every speaker is a role model and club members learn from one another's speeches.",
            "Evaluator 1": "Evaluators provide verbal and written feedback to meeting speakers.",
            "Evaluator 2": "Evaluators provide verbal and written feedback to meeting speakers.",
            "Evaluator 3": "Evaluators provide verbal and written feedback to meeting speakers.",
            "Evaluator 4": "Evaluators provide verbal and written feedback to meeting speakers.",
        }

        return roledescriptions[roles.roleName];
    }
    
}