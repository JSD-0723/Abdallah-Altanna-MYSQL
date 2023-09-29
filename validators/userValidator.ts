import joi from 'joi';

const passwordPatternMessage =
  'Password must contain at least 8 characters, one uppercase, one number and one special case character';

export default joi.object({
  id: joi.number().integer().min(1),
  username: joi
    .string()
    .min(3)
    .max(255)
    .options({
      messages: {
        'string.pattern.base': 'Please enter a valid username.',
        'string.empty': 'Please enter a username.',
        'string.min': 'min 3 characters',
        'string.max': 'max 255 characters'
      }
    })
    .trim()
    .required(),
  email: joi
    .string()
    .email()
    .options({
      messages: {
        'string.pattern.base': 'Please enter a valid email.',
        'string.empty': 'Please enter a email.'
      }
    })
    .trim()
    .required(),
  password: joi
    .string()
    .min(8)
    .max(30)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      passwordPatternMessage
    )
    .options({
      messages: {
        'string.pattern.base': 'Please, enter a valid password',
        'string.min': 'minimum 8 character required',
        'string.max': 'maximum 30 characters allowed'
      }
    })
    .required()
});
