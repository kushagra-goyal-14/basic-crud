const userRepository = require("../repository/userRepo.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userService {
  constructor() {
    this.userRepo = new userRepository();
  }

  async signin({ email, password }) {
    try {
      const user = await this.userRepo.getUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      console.log(user);
      const pass = await bcrypt.compare(password, user.password);
      if (!pass) {
        throw new Error("Wrong password");
      }

      const newJwt = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRY,
        }
      );

      return newJwt;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await this.userRepo.get(decoded.id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const response = await this.userRepo.getUserByEmail(email);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createUser(data) {
    try {
      data.password = await bcrypt.hash(data.password, 10);
      const response = await this.userRepo.createUser(data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async updateUser(data) {
    try {
      data.password = await bcrypt.hash(data.password, 10);
      const response = await this.userRepo.updateUser(data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async deleteUser(data) {
    try {
      const response = await this.userRepo.deleteUser(data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = userService;
