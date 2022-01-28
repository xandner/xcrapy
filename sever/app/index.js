const express = require("express");
const corse = require("cors");
const morgan = require("morgan");
const winston = require("winston");
require("express-async-errors");
const file_upload=require("express-fileupload");

const ErrorMiddleware = require("./http/middleware/Error");

const app = express();
const api = require("./routes/index")


class Application {
  constructor() {
    this.setupExpressServer();
    this.setupRoutesAndMiddleware();
    this.setupConfig();
  }
  setupRoutesAndMiddleware() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(file_upload({
      createParentPath: true
    }))

    if (process.env.pruduction == true) app.use(morgan(tiny));
    app.use(corse());
    app.use(api)
    app.use(ErrorMiddleware);
  }
  setupConfig() {
    winston.add(new winston.transports.File({ filename: "error-log.log" }));
    process.on("uncaughtException", (err) => {
      console.log(err);
      winston.error(err.message);
    });
    process.on("unhandledRejection", (err) => {
      console.log(err);
      winston.error(err.message);
    });
    // app.set("view engine", "pug");
    app.set("views", "../views");
  }

  setupExpressServer() {
    const port = process.env.port || 3000;
    app.listen(port, (err) => {
      if (err) console.log(err);
      else console.log("listening on port " + port);
    });
  }
}

module.exports = Application;
