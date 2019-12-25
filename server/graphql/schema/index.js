const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type User{
    _id: ID!
    username: String!
    password: String!
    isAdmin: Int
    pointsGain: Boolean
    best1: Boolean
    best2: Boolean
    best3: Boolean
    role: [Roles!]
    gamifications: Gamification
    experiences: Experience
    information: UserInfo!
}

type Performance {
    _id: ID!
    title: String!
    date: String!
    owner: User!
}

type UserInfo{
    _id: ID!
    lastname: String!
    firstname: String!
    middlename: String!
    email: String!
    phone: String
    organization: String
    addressOne: String
    addressTwo: String
    postcode: String
    photo: String
    owner: User!
}

type Roles{
    _id: ID!
    owner: User!
    roleName: String!
    theme: String
    wordOfTheDay: String
    spTitle: String
    spProjectNo: String
    spPathway: String
    spObjective: String
    date: String!
    status: String
    expiryDate: Meeting!
}

type Experience{
    _id: ID!
    owner: User!
    toastmaster: Int
    surgentAtArms: Int
    grammarian: Int
    ahCounter: Int
    generalEvaluator: Int
    topicsMaster: Int
    timer: Int
    speeches: Int
    evaluations: Int
}

type Gamification{
    _id: ID!
    owner: User!
    totalRoles: Int
    points: Int
    trophies: Int
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

type Meeting {
    _id: ID!
    date: String!
    status: String
    setRole: [Roles!]
}

input UserInput {
    username: String!
    password: String!
    email: String!
}

input UserInfoInput {
    lastname: String!
    firstname: String!
    middlename: String!
    email: String!
    phone: String
    organization: String
    addressOne: String
    addressTwo: String
    postcode: String
    Photo: String
}

input RoleInput{
    roleName: String!
    theme: String
    wordOfTheDay: String
    spTitle: String
    spProjectNo: String
    spPathway: String
    spObjective: String
}

type RootQuery{
    searchUser(userId: String!): User
    getUser: User
    getAllUser: [User!]!
    login(username: String!, password: String!): AuthData
    getGamification: Gamification
    getExperience: Experience
    getRoles: [Roles!]!
    getCompletedRoles: [Roles!]!
    getMeeting: Meeting
    getDescription: String
    getAllUserName: [User!]!
    getPerformance: [Performance!]!
}

type RootMutation {
    register(userInfoInput: UserInfoInput): String
    updateInfo(userInfoInput: UserInfoInput): String
    addUser(userInput: UserInput): User
    updateUser(username: String, password: String, email: String!): String
    setRoles(roleInput: RoleInput): Roles
    setAdmin(username: String!, isAdmin: Int!): User
    cancelRoles: String
    setMeeting(date: String!): String
    meetingComplete(best1: String, best2: String, best3: String): String
    updateExperience(username: String!): String
    updateGamification(username: String!): String
    resetFlags: String
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)