import Joi from '@hapi/joi'
import expressJoiValidation from 'express-joi-validation'

const validation = expressJoiValidation.createValidator({})

const createUserSchema = Joi.object({
  login: Joi.string()
    .required(),
  password: Joi.string()
    .required()
    .pattern(/^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/)
    .error((errors) => {
      errors[0].message = 'Password must contain numbers and letters.'

      return errors
    }),
  age: Joi.number()
    .required()
    .min(4)
    .max(130)
})

const validator = {
  createUser: validation.body(createUserSchema)
}

export default validator
