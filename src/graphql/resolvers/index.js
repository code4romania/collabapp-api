import { createRecoveryToken, createSessionToken, verifyToken } from '../../utils/token'

export default {
  Mutation: {
    forgotPassword: async (root, payload, { mongoose: { User } }) => {
      const user = await User.findOne({ email: payload.email })

      if (!user) {
        throw new Error('User not found!')
      }

      // @todo: send email

      return {
        token: createRecoveryToken(user.get('email'))
      }
    },
    login: async (root, payload, { mongoose: { User } }) => {
      const user = await User.findOne({ email: payload.email })

      if (!user) {
        throw new Error('Email not found!')
      }

      if (!await user.checkPassword(payload.password)) {
        throw new Error('Incorrect password!')
      }

      return {
        token: createSessionToken(user.get('id'), payload.remember)
      }
    },
    resetPassword: async (root, payload, { mongoose: { User } }) => {
      const error = new User(payload).validateSync('password')

      if (error) {
        throw error
      }

      const decoded = verifyToken(payload.token)

      const user = await User.findOne({ email: decoded.email })

      if (!user) {
        throw new Error('User not found!')
      }

      user.set('password', await user.encryptPassword(payload.password))

      // @todo: send email

      return user.save()
    },
    signup: async (root, payload, { mongoose: { User } }) => {
      const existingUser = await User.findOne({ email: payload.email })

      if (existingUser) {
        throw new Error('Email already registered!')
      }

      const user = new User(payload)

      await user.validate()

      user.set('password', await user.encryptPassword(user.get('password')))

      // @todo: send email

      return user.save()
    }
  },
  Query: {
    user: async (root, payload, { mongoose: { User } }) => {
      const user = await User.findOne(payload)

      if (!user) {
        throw new Error('User not found!')
      }

      return user
    }
  }
}
