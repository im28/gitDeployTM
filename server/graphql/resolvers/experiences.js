const Experience = require('../../models/experience');
const User = require('../../models/user');

module.exports = {
    getExperience: async (args, req) => {
        const experience = await Experience.findOne({ owner: req.userId})
        if(!experience){
            throw new Error('Experience does not exist');
        }
        
        return experience;
    },
    updateExperience: async ({username}) => { // Only for testing (BlackBox)
        const owner = await User.findOne({username: username})

        if(!owner){
            throw new Error('No user found for updating the experience!')
        }

        const experience = await Experience.findOne({ owner: owner._id})

        if(!experience){
            throw new Error('Experience does not exist');
        }

        if(experience != null){
            await Experience.updateOne({_id: experience._id}, {toastmaster: 5, surgentAtArms: 6, generalEvaluator: 3});
        }
        
        return "Success update experience!";
    }
}