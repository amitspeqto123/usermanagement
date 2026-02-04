import Joi from "joi";
import ApiError from "../utils/ApiError.js";

const validate = (schema) => (req, res, next) => {
  const validSchema = {};
  if (schema.body) validSchema.body = schema.body;
  if (schema.query) validSchema.query = schema.query;
  if (schema.params) validSchema.params = schema.params;

  const object = {};
  if (schema.body) object.body = req.body;
  if (schema.query) object.query = req.query;
  if (schema.params) object.params = req.params;

  const { error, value } = Joi.compile(validSchema)
    .prefs({ abortEarly: false })
    .validate(object);

  if (error) {
    const message = error.details.map((d) => d.message).join(", ");
    return next(new ApiError(400, message));
  }

  // ✅ body & params → replace allowed
  if (value.body) req.body = value.body;
  if (value.params) req.params = value.params;

  // ✅ query → MUTATE, never replace
  if (value.query) {
    Object.assign(req.query, value.query);
  }

  next();
};

export default validate;
