const Performance = require('../../models/performance');
const User = require('../../models/user');

module.exports = {
    getPerformance: async (args, req) => {

        if(!req.isAuth){
            throw new Error('Unauthenticated!');
        }
        
        const performance = await Performance.find({ owner: req.userId})

        if(!performance){
            throw new Error('Performance does not exist');
        }

        let newPerformance = []

        for(let i = 0;i<performance.length;i++){
            newPerformance.push(
                new Performance({
                    title: performance[i].title,
                    date: performance[i].date
                })
            )
        }

        return newPerformance;
    }
}