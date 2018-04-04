import { formatError } from 'apollo-errors'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { json } from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { ENV } from './constants/environment'
import models from './mongoose/models'
import schema from './graphql/schema'

const app = express()

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(morgan('combined'))

app.use('/graphql', json(), graphqlExpress({
  context: {
    mongoose: models
  },
  formatError,
  schema
}))

if (process.env.NODE_ENV !== ENV.PRODUCTION) {
  app.get('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }))
}

export default app
