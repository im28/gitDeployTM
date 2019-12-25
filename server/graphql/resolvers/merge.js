const User = require('../../models/user');

const user = async userId => {
    try{
        const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id
        };
    } catch (err) {
        throw err;
    }
};

const userName = async userId => {
    try{
        const user = await User.findById(userId);
        return {
            ...user._doc,
            firstname: user.firstname
        };
    } catch (err) {
        throw err;
    }
};

exports.user = user;
exports.userName = userName;