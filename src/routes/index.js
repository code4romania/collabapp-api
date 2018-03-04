import express from 'express';
import expressGraphql from 'express-graphql';
import { formatError } from 'apollo-errors';
import mongoModels from '../database/models';
import schema from '../graphql/schema';

const router = express.Router();

router.use('/', expressGraphql(req => ({
    context: {
        mongo: mongoModels,
    },
    graphiql: true,
    schema,
    formatError,
    pretty: true,

})));

export default router;
