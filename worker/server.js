const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();

const { Log, Product } = require("./helpers/database");
const port = process.env.port;

app.get("/", (req, res) => {
  console.log("****");
  return res.send("Hello World!");
});
app.post("/product", async (req, res) => {
    console.log(req.body);
  const data = {
    log_id: req.body.log_id,
    site_url: req.body.site_url,
    product_name: req.body.product.product_name,
    product_description: req.body.product.product_description,
    product_link: req.body.product.product_url,
    product_status: req.body.product.product_exists,
    product_price: parseInt(req.body.product.product_price),
    product_image: req.body.product.product_image,
    product_category: req.body.product.product_category,
  };
  await Product.create_product(data);
  return res.status(200).json({ message: "ok" });
});
app.post("/open", async (req, res) => {
  console.log("open");
  console.log(req.body);
  data = {
    site_url: req.body.site_url,
    status: "started",
  };
  //   console.log(data)
  const log = await Log.create_log(data);
  console.log(log);

  return res.status(200).json({ log_id: log.id });
});
app.post("/close", async (req, res) => {
  console.log(req.body);
  data = {
    site_url: req.body.site_url,
    status: "ended",
    log_id: req.body.log_id,
  };
  await Log.upsert_log(data);
  console.log("close");
  return res.send("ok");
});

app.listen(port || 3000, () => {
  console.log(`Example app listening on port ${port}`);
});
