// @todo: use dotenv package
export default {
  BCRYPT_SALT_ROUNDS: 10,
  JWT_SECRET: 'my-secret',
  MONGO: {
    URI: 'mongodb://localhost:27017/collab_app'
  },
  PORT: 3000
}
