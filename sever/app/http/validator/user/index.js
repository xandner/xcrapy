const Joi = require("joi");
const create_user_validator = async (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().max(30).min(3).required(),
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};
const login_user_validator = async (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = {
  create_user_validator,
  login_user_validator,
};
