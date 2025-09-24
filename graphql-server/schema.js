const { gql } = require("apollo-server");
const userType = require("./modules/users/user.type");

const root = gql`
    type Query
    type Mutation
`;

module.exports = [root, userType];