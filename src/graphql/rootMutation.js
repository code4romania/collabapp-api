import { GraphQLObjectType } from 'graphql';
import userMutation from './types/User/userMutation';

const Mutation = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'The root Mutation type.',
    fields: Object.assign({},
        userMutation,
    ),
});

export default Mutation;
