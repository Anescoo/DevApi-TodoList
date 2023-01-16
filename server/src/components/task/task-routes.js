import Router from '@koa/router'
import * as TaskControllers from '#components/task/task-controllers.js'
import {isAuthenticated, isAuthenticatedWithUser } from '../../middlewares/jwt-handler.js'

const tasks = new Router()

tasks.get('/', isAuthenticated, TaskControllers.index)
tasks.get('/:id', isAuthenticated, TaskControllers.id)
tasks.get('/lists/:listId', TaskControllers.getAllByList)
tasks.post('/', isAuthenticatedWithUser, TaskControllers.create)
tasks.put('/:id', isAuthenticated, TaskControllers.update)
tasks.del('/:id', isAuthenticated, TaskControllers.destroy)

export default tasks
