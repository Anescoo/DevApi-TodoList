import Exemple from '#components/exemple/exemple-model.js'
import Joi from 'joi'

export async function index (ctx) {
  try {
    ctx.body = await Exemple.find({})
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function create (ctx) {
  try {
    const exempleValidationSchema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string(),
      colors: Joi.array().has(Joi.string()),
      price: Joi.number().required()
    })

    const { error } = exempleValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)

    ctx.body = "Hello"
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}
