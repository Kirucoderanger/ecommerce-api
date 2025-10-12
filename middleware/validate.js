/*const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const toValidate = {};
  if (schema.params) toValidate.params = req.params || {};
  if (schema.query) toValidate.query = req.query || {};
  if (schema.body) toValidate.body = req.body || {};

  const validationSchema = {};
  if (schema.params) validationSchema.params = schema.params;
  if (schema.query) validationSchema.query = schema.query;
  if (schema.body) validationSchema.body = schema.body;

  const { error, value } = Joi.object(validationSchema).unknown(true).validate(toValidate, { abortEarly: false });

  if (error) {
    const err = new Error('Validation Error');
    err.statusCode = 400;
    err.details = error.details.map(d => ({ path: d.path, message: d.message }));
    return next(err);
  }

  // overwrite validated parts
  if (value.body) req.body = value.body;
  if (value.params) req.params = value.params;
  if (value.query) req.query = value.query;

  next();
};

module.exports = validate;*/

const Joi = require('joi');

const validate = (schemas = {}) => (req, res, next) => {
  const data = {
    params: req.params || {},
    query: req.query || {},
    body: req.body || {},
  };

  const validationSchema = {};
  if (schemas.params) validationSchema.params = schemas.params;
  if (schemas.query) validationSchema.query = schemas.query;
  if (schemas.body) validationSchema.body = schemas.body;

  // Skip if no schema provided
  if (Object.keys(validationSchema).length === 0) return next();

  const { error, value = {} } = Joi.object(validationSchema).unknown(true).validate(data, { abortEarly: false });

  if (error) {
    const err = new Error('Validation Error');
    err.statusCode = 400;
    err.details = error.details.map(d => ({ path: d.path, message: d.message }));
    return next(err);
  }

  if (value.body) req.body = value.body;
  if (value.params) req.params = value.params;
  if (value.query) req.query = value.query;

  next();
};

module.exports = validate;
