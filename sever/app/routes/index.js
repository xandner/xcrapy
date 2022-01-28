const router=require('express').Router()



router.get("/",(req,res)=>{
    res.status(200).json({message:"ok"})
})
router.use("/crawl",require("./apis/crawler/index"))
router.use("/spider",require("./apis/spider/index"))
router.use("/user", require("./apis/users/index"));
router.use("/product", require("./apis/product/index"));

module.exports=router