import Router from '@koa/router'
import * as UserControllers from '#components/user/user-controllers.js'
import * as TaskControllers from '#components/task/task-controllers.js'
import { isAuthenticatedWithUser } from "../../middlewares/jwt-handler.js"

const users =  new Router()

users.post('/register', UserControllers.register)
users.post('/login', UserControllers.login)
users.get('/profile', isAuthenticatedWithUser, UserControllers.profile)
users.put('/profile', isAuthenticatedWithUser, UserControllers.profileUpdate)
users.get('/', UserControllers.index)
users.get('/:id', UserControllers.id)

export default users