import { GraphQLObjectType } from 'graphql';
import userQuery from './types/User/userQuery';

const Query = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'The root Query type.',
    fields: Object.assign({},
        userQuery,
    ),
});

export default Query;
