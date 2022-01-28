const route = require("express").Router();

const { User } = require("../../../http/controller/users/index");
const user_unique=require("../../../http/middleware/user_unique")
route.get("/",User.all_users);
route.post("/create", User.create_user);
route.post("/login", User.login_user);

module.exports = route;
