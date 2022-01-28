const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User_model } = require("../../../models/database/index");
const {
  create_user_validator,
  login_user_validator,
} = require("../../validator/user");

class User {
  static async all_users(req, res) {
    const users = await User_model.get_all_user();
    res.json(users);
  }
  static async create_user(req, res) {
    const { error } = await create_user_validator(req.body);
    const create_user = req.body;
    if (error) {
      return res.status(400).json(error);
    }
    let _user = await User_model.find_user(create_user);
    if (_user) {
      return res.status(400).json({ message: "user axist" });
    }

    // hash possword
    const hashed_password = await bcrypt.hash(create_user.password, 8);
    console.log(hashed_password);

    const data = {};
    data["user_name"] = create_user.username;
    data["name"] = create_user.name;
    data["email"] = create_user.email;
    data["password"] = hashed_password;
    // create user
    const created_user = await User_model.create_user(data);
    res.status(201).json(created_user);
  }
  static async login_user(req, res) {
    // validate
    const { error } = await login_user_validator(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    const _user = await User_model.find_user(req.body);
    if (!_user) {
      return res.status(400).json({ message: "user not exist" });
    }
    console.log(req.body.password);
    console.log(_user);
    const is_password_correct = await bcrypt.compare(
      req.body.password,
      _user.password
    );
    if (is_password_correct) {
        // generate token
      const token = jwt.sign({ id: _user.user_name }, process.env.jwt_secret, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).json({message:token})
    } else {
      return res.status(400).json({ message: "password is wrongr" });
    }
  }
}
module.exports = {
  User,
};
