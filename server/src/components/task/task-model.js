import mongoose from 'mongoose'

const { Schema } = mongoose

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  done: {
    type: Boolean,
    default: false
  },
  list: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'List'
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { 
  timestamps: true
})

taskSchema.static({
  findByListId (listId) {
    return this.find({ list: listId })
  },
  findOneByCreatorId(creatorId, taskId) {
    return this.findOne({ creator: creatorId, _id: taskId })
  },
  findOneByCreatorIdAndUpdate(creatorId, taskId, updateTask) {
    return this.findOneAndUpdate({ creator: creatorId, _id: taskId }, updateTask)
  },
  findOneByCreatorIdAndDelete(creatorId, taskId) {
    return this.findOneAndDelete({ creator: creatorId, _id: taskId })
  }
})

const Task = mongoose.model('Task', taskSchema)

export default Task