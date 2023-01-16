import mongoose from 'mongoose'

const { Schema } = mongoose

const listSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
})

listSchema.static({
  findOneByCreatorId(creatorId, listId) {
    return this.findOne({ creator: creatorId, _id: listId })
  },
  findOneByCreatorIdAndUpdate(creatorId, listId, updateList) {
    return this.findOneAndUpdate({ creator: creatorId, _id: listId }, updateList)
  },
  findOneByCreatorIdAndDelete(creatorId, listId) {
    return this.findOneAndDelete({ creator: creatorId, _id: listId })
  }
})

const List = mongoose.model('List', listSchema)

export default List