import mongoose from 'mongoose'

const User = new mongoose.Schema({
  email: {
    lowercase: true,
    required: true,
    trim: true,
    type: String,
    unique: true
  },
  firstName: {
    trim: true,
    type: String,
    required: true
  },
  lastName: {
    trim: true,
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  privileges: {
    type: String
  }
},
{
  timestamps: true,
  collection: 'users'
})

export default mongoose.model('User', User)
