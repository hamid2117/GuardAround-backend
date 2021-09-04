import mongoose from 'mongoose'
const Schema = mongoose.Schema

const likes = new Schema(
  {
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'incidents',
      index: true,
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        index: true,
      },
    ],
    count: { type: Number, default: 0, index: true },
    heart: {
      count: { type: Number, default: 0, index: true },
      user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          index: true,
        },
      ],
    },
    clap: {
      count: { type: Number, default: 0, index: true },
      user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          index: true,
        },
      ],
    },
    thanks: {
      count: { type: Number, default: 0, index: true },
      user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          index: true,
        },
      ],
    },
    angry: {
      count: { type: Number, default: 0, index: true },
      user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          index: true,
        },
      ],
    },
    cry: {
      count: { type: Number, default: 0, index: true },
      user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          index: true,
        },
      ],
    },
    shock: {
      count: { type: Number, default: 0, index: true },
      user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          index: true,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
)
const Like = mongoose.model('likes', likes)

export default Like
