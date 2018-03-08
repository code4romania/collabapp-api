import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'A user object.',
    fields: {
        _id: {
            type: GraphQLID,
            description: "A user's id.",
        },
        firstName: {
            type: new GraphQLNonNull(GraphQLString),
            description: "A user's firstname.",
        },
        lastName: {
            type: new GraphQLNonNull(GraphQLString),
            description: "A user's lastname.",
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: "A user's email.",
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: "A user's password.",
        },
        privileges: {
            type: GraphQLString,
            description: "A user's privileges.",
        },
    },
});

export default UserType;
