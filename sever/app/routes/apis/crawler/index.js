const router=require("express").Router()

router.get("/",(req,res)=>{
    console.log("***")
    res.status(200).json({message:"crawler"})
})

module.exports=router