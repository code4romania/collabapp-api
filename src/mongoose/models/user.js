import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import config from '../../config'

const { BCRYPT_SALT_ROUNDS } = config

const User = new mongoose.Schema({
  email: {
    lowercase: true,
    required: true,
    trim: true,
    type: String,
    unique: true
  },
  firstName: {
    required: true,
    trim: true,
    type: String
  },
  lastName: {
    required: true,
    trim: true,
    type: String
  },
  password: {
    minlength: 6,
    required: true,
    type: String
  },
  privileges: {
    default: [],
    type: Array
  }
},
{
  timestamps: true,
  collection: 'users'
})

// @todo: email validation
// @todo: convert email to lowercase when using find* methods

User.method('checkPassword', async function (password) {
  return bcrypt.compare(password, this.password)
})

User.method('encryptPassword', async (password) => (
  bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
))

export default mongoose.model('User', User)
