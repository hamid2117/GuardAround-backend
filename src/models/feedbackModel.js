import mongoose from 'mongoose'

const Schema = mongoose.Schema
const feedback = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      index: true,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
const Feedback = mongoose.model('feedback', feedback)

export default Feedback
