import { GraphQLString, GraphQLID } from 'graphql';
import UserType from './../userType';

const getUser = {
    type: UserType,
    description: 'Get a user by id.',
    args: {
        _id: {
            type: GraphQLID,
        },
    },
    resolve: async (parent, args, { mongo: { User } }) => User.findOne(args),
};

export default getUser;
