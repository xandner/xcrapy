const route = require("express").Router();
const { Router } = require("express");
const { Spider } = require("../../../http/controller/spider/index");
route.get("/", Spider.all_spiders);
route.post("/create", Spider.create_spider);
route.post("/create_egg",Spider.create_egg)

module.exports = route;
