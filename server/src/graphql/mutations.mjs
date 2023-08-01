export const mutations = `#graphql
    createUser(firstName: String!, lastName: String, email: String!, password: String!): String
    updateUser(id: ID!, firstName: String!, lastName: String, email: String!, password: String!): String
    deleteUser(id: ID!): String
    
`;
