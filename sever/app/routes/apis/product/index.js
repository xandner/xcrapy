const route = require("express").Router();
const{Product}=require("../../../http/controller/product/index")
route.get("/finished", Product.finished_job);

module.exports = route;
