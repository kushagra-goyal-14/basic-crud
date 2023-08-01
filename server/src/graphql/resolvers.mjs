import userService from "../services/userService.js";
const userServiceobj = new userService();

const queries = {
  getUserToken: async (_, { email, password }) => {
    const token = await userServiceobj.signin({ email, password });
    return token;
  },
  getCurrentLoggedInUser: async (_, parameters, context) => {
    if (context && context.user) {
      const email = context.user.email;
      const user = await userServiceobj.getUserByEmail(email);
      return user;
    }
    throw new Error("User not found");
  },
};

const mutations = {
  createUser: async (_, { firstName, lastName, email, password }) => {
    const res = await userServiceobj.createUser({
      firstName,
      lastName,
      email,
      password,
    });
    return res.id;
  },
  updateUser: async (_, { id, firstName, lastName, email, password }) => {
    const res = await userServiceobj.updateUser({
      id,
      firstName,
      lastName,
      email,
      password,
    });
    return true;
  },
  deleteUser: async (_, { id }) => {
    const res = await userServiceobj.deleteUser({
      id,
    });
    return res.id;
  },
};

export const resolvers = { queries, mutations };
