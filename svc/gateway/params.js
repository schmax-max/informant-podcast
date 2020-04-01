const Joi = require("@hapi/joi");
exports.params = Joi.object({
  trigger: Joi.string()
});
// .valid('sports', 'slugs', 'curators', 'photos')
