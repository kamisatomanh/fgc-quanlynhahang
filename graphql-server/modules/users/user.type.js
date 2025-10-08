const { gql } = require("apollo-server");

module.exports = gql`
    enum Role {
        manager
        staff
    }
    
    enum Status {
        active
        inactive
    }

    type User {
        user_id: ID!
        full_name: String!
        phone_number: String!
        password_hash: String!
        bank_name: String
        bank_number: String
        role: Role!
        status: Status!
        created_at: String
    }
    
    extend type Query {
        users: [User]
        user(user_id: ID!): User
    }

    extend type Mutation {
        addUser(full_name: String!, phone_number: String!, password_hash: String!, bank_name: String, bank_number: String, role: Role!, status: Status!): User
        updateUser(user_id: ID!, full_name: String, phone_number: String, bank_name: String, bank_number: String, role: Role status: Status): User
        deleteUser(user_id: ID!): Boolean
    }
`;