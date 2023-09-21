import Joi from 'joi';

const bookValidation = Joi.object({
  id: Joi.number().integer().min(0),
  author: Joi.string()
    .min(3)
    .max(25)
    .trim()
    .label('author')
    .options({
      messages: {
        'any.required': 'Please, enter the {{#label}}',
        'string.empty': 'Sorry, {{#label}} can not be empty',
        'string.min': 'minimum 3 character required',
        'string.max': 'maximum 30 characters allowed'
      }
    })
    .required(),

  ISBN: Joi.string()
    .min(3)
    .max(25)
    .trim()
    .label('ISBN')
    .options({
      messages: {
        'any.required': 'Please, enter the {{#label}}',
        'string.empty': 'Sorry, {{#label}} can not be empty',
        'string.min': 'minimum 3 character required',
        'string.max': 'maximum 30 characters allowed'
      }
    })
    .required()
});

export default bookValidation;
