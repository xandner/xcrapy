const path = require("path");
const { egg_maker } = require("../../../helper/egg_maker");
const { Spider_model } = require("../../../models/database/index");

const { spider_validator, create_egg_validator } = require("../../validator/spider/index");
class Spider {
  static async all_spiders(req, res) {
    res.status(200).json({ message: "all_spider" });
  }
  static async create_spider(req, res) {
    try {
      const valid_spider_data = await spider_validator.validateAsync(req.body);
      const data = await Spider_model.create_spider(valid_spider_data);
      res.send(data);
    } catch (error) {
      console.log("-->", error.message);
      res.status(400).send({ message: error.message });
    }
  }
  static async create_egg(req, res) {
    console.log("***")
      const {error}=await create_egg_validator(req.body)
      if (error){
          return res.status(400).json(error)
      }
      await egg_maker(req.body.spider_name, req.body.spider_directory);
      res.send("ok")
  }
}

module.exports = {
  Spider,
};
