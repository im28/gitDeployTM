const authResolver = require('./auth');
const informationResolver = require('./userInfo');
const experiencesResolver = require('./experiences');
const gamificationsResolver = require('./gamifications');
const rolesResolver = require('./roles');
const meetingResolver = require('./meetings')
const performancesResolver = require('./performances')

const rootResolver = {
    ...authResolver,
    ...informationResolver,
    ...experiencesResolver,
    ...gamificationsResolver,
    ...rolesResolver,
    ...meetingResolver,
    ...performancesResolver
};

module.exports = rootResolver;