import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    phone: {
      type: String,
      index: true,
      unique: true,
    },
    username: {
      type: String,
      index: true,
    },
    code: {
      type: String,
      index: true,
    },
    number: {
      type: String,
      index: true,
    },
    firstName: {
      type: String,
      index: true,
      default: '',
    },
    country: {
      type: String,
      index: true,
      default: '',
    },
    address: {
      type: String,
      index: true,
      default: '',
    },
    city: {
      type: String,
      index: true,
      default: '',
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true,
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },

    lastName: {
      type: String,
      index: true,
      default: '',
    },
    email: {
      type: String,
      index: true,
      default: '',
    },
    about: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: 'placeholder.jpg',
    },
    incidents: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['deleted', 'verified', 'unverified'],
      default: 'verified',
      index: true,
    },
    type: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      index: true,
    },
  },
  { timestamps: true }
)

const Users = mongoose.model('users', userSchema)

export default Users
