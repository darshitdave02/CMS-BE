const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(3).max(50).required(),
});

const contentTypeSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  columns: Joi.object().required(),
});

const contentTypeFieldSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  fields: Joi.array().items(Joi.string().min(3).max(50).required()).required(),
});

const renameContentTypeSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  newName: Joi.string().min(3).max(50).required(),
});

const renameFieldSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  fieldName: Joi.string().min(3).max(50).required(),
  newFieldName: Joi.string().min(3).max(50).required(),
});

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

module.exports = {
  validateBody,
  userSchema,
  contentTypeSchema,
  contentTypeFieldSchema,
  renameContentTypeSchema,
  renameFieldSchema,
};
