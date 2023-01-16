import TaskModel from '#components/task/task-model.js'

export async function updateTask (id, params) {
  return TaskModel.findByIdAndUpdate(id, params, { runValidators: true, new: true })
}