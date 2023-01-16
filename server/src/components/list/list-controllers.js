import ListModel from '#components/list/list-model.js'
import TaskModel from '#components/task/task-model.js'
import UserModel from '#components/user/user-model.js'

import Joi from 'Joi'

export async function index (ctx) {
  try {
    const lists = await ListModel.find({})
    ctx.ok(lists)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function id (ctx) {
  try {
    if(!ctx.params.id) throw new Error('No id supplied')
    const list = await ListModel.findOneByCreatorId(ctx.state.user.id, ctx.params.id)
    if(!list) { 
      return ctx.send(401)  
    }
    ctx.ok(list)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function create (ctx) {
  try {
    
    if(!ctx.state.user.id) throw new Error('No user id found')
    console.log(ctx.state.user)
    const listValidationSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string()
    })
    const { error, value } = listValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)
    const newList = await ListModel.create({...value, creator: ctx.state.user.id})
    ctx.ok(newList)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function update (ctx) {
  try {
    const listValidationSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string(),
      done: Joi.boolean()
    })
    if(!ctx.params.id) throw new Error('No id supplied')
    const { error, value } = listValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)
    const updatedList = await ListModel.findOneByCreatorIdAndUpdate(ctx.state.user.id, ctx.params.id, value)
    if(!updatedList) { 
      return ctx.send(401) 
    }
    ctx.ok("The list has been updated successfully")
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function destroy (ctx) {
  try {
    if(!ctx.params.id) throw new Error('No id supplied')
    const listDelete = await ListModel.findOneByCreatorIdAndDelete(ctx.state.user.id, ctx.params.id)
    if(!listDelete) { 
      return ctx.send(401) 
    }
    ctx.ok("The list has been deleted successfully")
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}