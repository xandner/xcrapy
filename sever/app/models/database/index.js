const winston = require("winston");

const { pg_db } = require("../helper/index");
class Product_model {}
class Spider_model {
  static async create_spider(_spider) {
    let data;
    try {
      console.log("creating");
      data = await pg_db.spider.create({
        data: {
          files: _spider.file,
          name: _spider.name,
          description: _spider.description,
          spider: _spider.spider,
          schedule: _spider.schedule,
        },
      });
      console.log(data);
    } catch (error) {
      data = error;
      winston.error(error)
      console.log(error);
    }
    return data;
  }
}
class User_model {
  static async get_all_user() {
    try {
      const users = await pg_db.user.findMany({});
      return users;
    } catch (error) {
      winston.error(error);
      return error;
    }
  }
  static async create_user(user) {
    console.log("create")
    try {
      const _user = await pg_db.user.create({
        data: user,
      });
      return _user;
    } catch (error) {
      console.log(error)
      winston.error(error);
      return error;
    }
  }
  static async find_user(_user) {
    console.log(_user)
    try {
      const user = await pg_db.user.findUnique({
        where: {
          user_name: _user.username,
        },
      });
      return user;
    } catch (error) {
      winston.error(error);
    }
  }
}
module.exports = {
  Product_model,
  Spider_model,
  User_model,
};
