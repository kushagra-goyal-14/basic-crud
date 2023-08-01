const CrudRepository = require("./crudRepo.js");
const { User } = require("../models/index.js");
class userRepository extends CrudRepository {
  constructor() {
    super(User);
  }
  async getUserByEmail(email) {
    try {
      const response = await User.findOne({
        where: {
          email: email,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async createUser(data) {
    try {
      const response = await User.create(data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async updateUser(data) {
    try {
      const response = await User.update(data, {
        where: {
          id: data.id,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async deleteUser(data) {
    try {
      const response = await User.destroy({
        where: {
          id: data.id,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = userRepository;
