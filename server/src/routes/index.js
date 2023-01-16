import Router from '@koa/router'
import exempleRoutes from '#components/exemple/exemple-routes.js'
import taskRoutes from '#components/task/task-routes.js'
import listRoutes from '#components/list/list-routes.js'
import userRoutes from '#components/user/user-routes.js'

//Api pour les exemples
const API_V1_ROUTER = new Router({prefix: '/api/v1'})
API_V1_ROUTER.use('/tasks', taskRoutes.routes(), taskRoutes.allowedMethods())
API_V1_ROUTER.use('/lists', listRoutes.routes(), listRoutes.allowedMethods())
API_V1_ROUTER.use('/users', userRoutes.routes(), userRoutes.allowedMethods())
API_V1_ROUTER.use('/exemples', exempleRoutes.routes(), exempleRoutes.allowedMethods())
export { API_V1_ROUTER }

// //Api pour les tasks
// const API_V2_ROUTER = new Router({prefix: '/api/v2'})
// API_V2_ROUTER.use('/tasks', taskRoutes.routes(), taskRoutes.allowedMethods())
// export { API_V2_ROUTER }

// //Api pour les lists
// const API_V3_ROUTER = new Router({prefix: '/api/v3'})
// API_V3_ROUTER.use('/lists', listRoutes.routes(), listRoutes.allowedMethods())
// export { API_V3_ROUTER }

// //Api pour les users
// const API_V4_ROUTER = new Router({prefix: '/api/v4'})
// API_V4_ROUTER.use('/users', userRoutes.routes(), userRoutes.allowedMethods())
// export { API_V4_ROUTER }

