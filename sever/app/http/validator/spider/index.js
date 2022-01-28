const Joi=require("joi")
const spider_validator= Joi.object({
    name:Joi.string().required(),
    description:Joi.string(),
    spider:Joi.string().required(),
    file:Joi.string().required(),
    schedule :Joi.string().required()
})

const create_egg_validator=async data=>{
    const schema=Joi.object({
        spider_name:Joi.string().required(),
        spider_directory:Joi.string().required()
    })
    return schema.validate(data)
}

module.exports = {
  spider_validator,
  create_egg_validator,
};

/* 
name:Joi.string().required(),
    description: Joi.String(),
  spider:Joi.String().required(),
  files:Joi.any().required()
*/
