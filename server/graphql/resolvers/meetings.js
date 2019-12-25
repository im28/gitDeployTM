const Meeting = require('../../models/meeting');
const Role = require('../../models/role');
const Experience = require('../../models/experience');
const Gamification = require('../../models/gamification');
const User = require('../../models/user');
const Performance = require('../../models/performance');

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
    getMeeting: async () => {// createEvent resolver
        try{
            const meeting = await Meeting.findOne({status: "Ongoing"})

            if(!meeting){
                throw new Error("No ongoing meeting!")
            }
            return meeting
        }catch(err) {
            console.log(err);
            throw err;
        };
    },
    setMeeting: async ({date},req) => {// createEvent resolver
        // if(!req.isAuth){
        //     throw new Error('Unauthenticated!');
        // }

        const existingMeeting = await Meeting.findOne({date: date})

        if(existingMeeting){
            throw new Error("Meeting already exist for this date: " + date)
        }

        const meetingt = await Meeting.findOne({status: "Ongoing"})

        if(meetingt){
            throw new Error("meeting ongoing right now!");
        }

        const meeting = new Meeting({
            date: date
        });

        try{
            const result = await meeting.save();
            if(!result){
                throw new Error("Meeting failed to set!")
            }
            return "Success setting up a meeting!"
        }catch(err) {
            console.log(err);
            throw err;
        };
    },
    // meetingComplete: async (req) => {
    //     // if(!req.isAuth){
    //     //     throw new Error('Unauthenticated!');
    //     // }

    //     // if(req.isAdmin == 0){
    //     //     throw new Error("Only admin can access!");
    //     // }

    //     const currentDate = new Date();
    //     const meeting = await Meeting.findOne({status: "Ongoing"})

    //     if(!meeting){
    //         throw new Error("No meeting ongoing right now!");
    //     }

    //     const passedDate = Date.daysBetween( new Date(currentDate), new Date(meeting.date));

    //     if(passedDate>0){
    //         throw new Error("Meeting date still not pass current date!")
    //     }

    //     const rolesArray = await Role.find({status: "Ongoing"});

    //     try{
    //         if(rolesArray){
    //             for(var i=0;i<rolesArray.length;i++){
    //                 if(rolesArray[i].status == "Ongoing"){
                        
    //                     const gamification = await Gamification.findOne({owner: rolesArray[i].owner._id});
    //                     const experience = await Experience.findOne({owner: rolesArray[i].owner._id});

    //                     if(gamification){
    //                         var newPoint = gamification.points + 10; // gain 10 points
    //                         if(newPoint < 0) newPoint = 0;
    //                         await Gamification.updateOne({owner: rolesArray[i].owner._id}, {points: newPoint});
    //                         await Gamification.updateOne({owner: rolesArray[i].owner._id}, {totalRoles: gamification.totalRoles + 1});
    //                     }else{
    //                         throw new Error("No experiences found!");
    //                     }

    //                     if(experience){
    //                         if(rolesArray[i].roleName == "Toastmaster of the evening"){
    //                             await Experience.updateOne({owner: rolesArray[i].owner._id}, {toastmaster: experience.toastmaster + 1});
    //                         }
    //                         else if(rolesArray[i].roleName == "Surgent At Arms"){
    //                             await Experience.updateOne({owner: rolesArray[i].owner._id}, {surgentAtArms: experience.surgentAtArms + 1});
    //                         }
    //                         else if(rolesArray[i].roleName == "Grammarian"){
    //                             await Experience.updateOne({owner: rolesArray[i].owner._id}, {grammarian: experience.grammarian + 1});
    //                         }
    //                         else if(rolesArray[i].roleName == "Ah-Counter"){
    //                             await Experience.updateOne({owner: rolesArray[i].owner._id}, {ahCounter: experience.ahCounter + 1});
    //                         }
    //                         else if(rolesArray[i].roleName == "General Evaluator"){
    //                             await Experience.updateOne({owner: rolesArray[i].owner._id}, {generalEvaluator: experience.generalEvaluator + 1});
    //                         }
    //                         else if(rolesArray[i].roleName == "Topics Master"){
    //                             await Experience.updateOne({owner: rolesArray[i].owner._id}, {topicsMaster: experience.topicsMaster + 1});
    //                         }
    //                         else if(rolesArray[i].roleName == "Timer"){
    //                             await Experience.updateOne({owner: rolesArray[i].owner._id}, {timer: experience.timer + 1});
    //                         }
    //                         else if(rolesArray[i].roleName == "Speaker 1" || rolesArray[i].roleName == "Speaker 2" || rolesArray[i].roleName == "Speaker 3" || rolesArray[i].roleName == "Speaker 4"){
    //                             await Experience.updateOne({owner: rolesArray[i].owner._id}, {speeches: experience.speeches + 1});
    //                         }
    //                         else if(rolesArray[i].roleName == "Evaluator 1" || rolesArray[i].roleName == "Evaluator 2"|| rolesArray[i].roleName == "Evaluator 3"|| rolesArray[i].roleName == "Evaluator 4"){
    //                             await Experience.updateOne({owner: rolesArray[i].owner._id}, {evaluations: experience.evaluations + 1});
    //                         }
    //                     }else{
    //                         throw new Error("No gamification found!");
    //                     }
    //                 }
    //             }
    //             await Role.updateMany({status: "Ongoing"}, {status: "Finish"})
    //             await Meeting.updateMany({status: "Ongoing"}, {status: "Finish"})

    //             return "Meeting completed for date: " + meeting.date
    //         }
    //         throw new Error("Roles for this date not exist")
    //     }
    //     catch(err) {
    //         throw err;
    //     }
    // },
    meetingComplete: async ({best1, best2, best3}, req) => {
        // if(!req.isAuth){
        //     throw new Error('Unauthenticated!');
        // }

        // if(req.isAdmin == 0){
        //     throw new Error("Only admin can access!");
        // }

        const best = ["Best Speaker", "Best Evaluator", "Best Table Topics"]

        const currentDate = new Date();
        const meeting = await Meeting.findOne({status: "Ongoing"})

        if(!meeting){
            throw new Error("No meeting ongoing right now!");
        }

        const passedDate = Date.daysBetween( new Date(currentDate), new Date(meeting.date));

        // if(passedDate>0){
        //     throw new Error("Meeting date still not pass current date!")
        // }

        if(best1 !==""){
            const bestUser = await User.findById(best1);

            if(bestUser){
                await User.updateOne({_id: bestUser._id}, {best1: true});

                const trophiesIncrease = await Gamification.findById(bestUser.gamifications._id);

                if(trophiesIncrease){
                    await Gamification.updateOne({_id: trophiesIncrease._id}, {trophies: trophiesIncrease.trophies + 1})
                }


                const meeting = await Meeting.findOne({status: "Ongoing"});

                if(!meeting){
                    throw new Error("Failed to fetch meeting!");
                }

                const performance = new Performance({
                    title: best[0],
                    date: meeting.date,
                    owner: bestUser._id
                })

                performance.save();
            } 
        }

        if(best2 !==""){
            const bestUser = await User.findById(best2);

            if(bestUser){
                await User.updateOne({_id: bestUser._id}, {best2: true});

                const trophiesIncrease = await Gamification.findById(bestUser.gamifications._id);

                if(trophiesIncrease){
                    await Gamification.updateOne({_id: trophiesIncrease._id}, {trophies: trophiesIncrease.trophies + 1})
                }


                const meeting = await Meeting.findOne({status: "Ongoing"});

                if(!meeting){
                    throw new Error("Failed to fetch meeting!");
                }

                const performance = new Performance({
                    title: best[1],
                    date: meeting.date,
                    owner: bestUser._id
                })

                performance.save();
            }
        }

        if(best3 !==""){
            const bestUser = await User.findById(best3);

            if(bestUser){
                await User.updateOne({_id: bestUser._id}, {best3: true});

                const trophiesIncrease = await Gamification.findById(bestUser.gamifications._id);

                if(trophiesIncrease){
                    await Gamification.updateOne({_id: trophiesIncrease._id}, {trophies: trophiesIncrease.trophies + 1})
                }

                const meeting = await Meeting.findOne({status: "Ongoing"});

                if(!meeting){
                    throw new Error("Failed to fetch meeting!");
                }

                const performance = new Performance({
                    title: best[2],
                    date: meeting.date,
                    owner: bestUser._id
                })

                performance.save();
            }
        }
        
        const rolesArray = await Role.find({status: "Ongoing"});

        try{
            if(rolesArray){
                for(var i=0;i<rolesArray.length;i++){
                    if(rolesArray[i].status == "Ongoing"){
                        
                        const user = await User.findById(rolesArray[i].owner._id);
                        const gamification = await Gamification.findOne({owner: rolesArray[i].owner._id});
                        const experience = await Experience.findOne({owner: rolesArray[i].owner._id});
                        
                        if(user){
                            await User.updateOne({_id: user._id}, {pointsGain: true})
                        }

                        if(gamification){
                            //var newPoint = gamification.points + 10; // gain 10 points
                            //if(newPoint < 0) newPoint = 0;
                            await Gamification.updateOne({owner: rolesArray[i].owner._id}, {points: gamification.points + 10, totalRoles: gamification.totalRoles + 1});
                            //await Gamification.updateOne({owner: rolesArray[i].owner._id}, {totalRoles: gamification.totalRoles + 1});
                        }else{
                            throw new Error("No experiences found!");
                        }

                        if(experience){
                            if(rolesArray[i].roleName == "Toastmaster of the evening"){
                                await Experience.updateOne({owner: rolesArray[i].owner._id}, {toastmaster: experience.toastmaster + 1});
                            }
                            else if(rolesArray[i].roleName == "Surgent At Arms"){
                                await Experience.updateOne({owner: rolesArray[i].owner._id}, {surgentAtArms: experience.surgentAtArms + 1});
                            }
                            else if(rolesArray[i].roleName == "Grammarian"){
                                await Experience.updateOne({owner: rolesArray[i].owner._id}, {grammarian: experience.grammarian + 1});
                            }
                            else if(rolesArray[i].roleName == "Ah-Counter"){
                                await Experience.updateOne({owner: rolesArray[i].owner._id}, {ahCounter: experience.ahCounter + 1});
                            }
                            else if(rolesArray[i].roleName == "General Evaluator"){
                                await Experience.updateOne({owner: rolesArray[i].owner._id}, {generalEvaluator: experience.generalEvaluator + 1});
                            }
                            else if(rolesArray[i].roleName == "Topics Master"){
                                await Experience.updateOne({owner: rolesArray[i].owner._id}, {topicsMaster: experience.topicsMaster + 1});
                            }
                            else if(rolesArray[i].roleName == "Timer"){
                                await Experience.updateOne({owner: rolesArray[i].owner._id}, {timer: experience.timer + 1});
                            }
                            else if(rolesArray[i].roleName == "Speaker 1" || rolesArray[i].roleName == "Speaker 2" || rolesArray[i].roleName == "Speaker 3" || rolesArray[i].roleName == "Speaker 4"){
                                await Experience.updateOne({owner: rolesArray[i].owner._id}, {speeches: experience.speeches + 1});
                            }
                            else if(rolesArray[i].roleName == "Evaluator 1" || rolesArray[i].roleName == "Evaluator 2"|| rolesArray[i].roleName == "Evaluator 3"|| rolesArray[i].roleName == "Evaluator 4"){
                                await Experience.updateOne({owner: rolesArray[i].owner._id}, {evaluations: experience.evaluations + 1});
                            }
                        }else{
                            throw new Error("No gamification found!");
                        }
                    }
                }
                await Role.updateMany({status: "Ongoing"}, {status: "Finish"})
                await Meeting.updateMany({status: "Ongoing"}, {status: "Finish"})

                return "Meeting completed for date: " + meeting.date
            }
            throw new Error("Roles for this date not exist")
        }
        catch(err) {
            throw err;
        }
    }
}