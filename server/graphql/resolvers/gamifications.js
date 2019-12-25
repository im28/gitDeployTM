const Gamification = require('../../models/gamification');
const User = require('../../models/user');

module.exports = {
    getGamification: async (args, req) => {
        const gamification = await Gamification.findOne({ owner: req.userId})

        if(!gamification){
            throw new Error('Experience does not exist');
        }

        return gamification;
    },
    updateGamification: async ({username}) => { // Only for testing (BlackBox)
        const owner = await User.findOne({username: username})

        if(!owner){
            throw new Error('No user found for updating the gamification!')
        }

        const gamification = await Gamification.findOne({ owner: owner._id})

        if(!gamification){
            throw new Error('Experience does not exist');
        }

        if(gamification != null){
            await Gamification.updateOne({_id: gamification._id}, {totalRoles: 14, points: 140});
        }

        return "Success update gamification!";
    },
}