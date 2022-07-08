const Joi = require('joi');

function validateUser(body) {
  const schema = Joi.object({
    names: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required().min(6).max(70),
    nationalId: Joi.string().required().min(16).max(16),
    address: Joi.string().required().min(6).max(70),
  });
  return schema.validate(body);
}

function validateCandidate(body) {
  const schema = Joi.object({
    names: Joi.string().required(),
    nationalId: Joi.string().required().min(16).max(16),
    votes: Joi.number().default(0),
    gender: Joi.string().required().max(7),
    pollId: Joi.string().required(),
    mission: Joi.string().min(10).max(500).required(),
    party: Joi.string(),
    profilePicture: Joi.string().min(6).max(255),
  });
  return schema.validate(body);
}

function validatePoll(body) {
  const schema = Joi.object({
    name: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    status: Joi.string().valid("ONGOING", "CLOSED", "CANCELLED", "PENDING"),
  });
  return schema.validate(body);
}

validateUserPoll = Joi.object().keys({
  userId: Joi.string().required(),
  pollId: Joi.string().required(),
  candidateId: Joi.string().required(),
});

module.exports = {
  validateUser,
  validateCandidate,
  validatePoll,
  validateUserPoll,
};