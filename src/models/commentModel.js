import mongoose from 'mongoose'
const Schema = mongoose.Schema

const commentss = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      index: true,
    },
  },
  {
    timestamps: true,
  }
)
const comments = new Schema(
  {
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'incidents',
      index: true,
    },
    comments: [commentss],
    count: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

const Comments = mongoose.model('comments', comments)

export default Comments
