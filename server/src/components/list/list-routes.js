import Router from '@koa/router'
import * as listControllers from '#components/list/list-controllers.js'
import {isAuthenticated, isAuthenticatedWithUser } from '../../middlewares/jwt-handler.js'

const lists = new Router()

lists.get('/', listControllers.index)
lists.get('/:id', isAuthenticated, listControllers.id)
lists.post('/', isAuthenticatedWithUser, listControllers.create)
lists.put('/:id', isAuthenticated, listControllers.update)
lists.del('/:id', isAuthenticated, listControllers.destroy)

export default lists