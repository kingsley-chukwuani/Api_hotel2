const Joi = require('joi');

module.exports = (schema) => {
    return (req, res, next) => {
      console.log('req.body:', req.body);
      const { error } = schema.validate(req.body);
      if (error) {
        console.log('Validation error:', error);
        return res.status(400).send(error.details[0].message);
      }
      next();
    };
  };