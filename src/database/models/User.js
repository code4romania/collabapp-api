import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        description: "A user's firstName.",
    },
    lastName: {
        type: String,
        required: true,
        description: "A user's lastName.",
    },
    email: {
        type: String,
        description: "A user's email.",
    },
    password: {
        type: String,
        description: "A user's password.",
    },
    privileges: {
        type: String,
        description: "A user's privileges.",
    },
},
{
    timestamps: true,
    collection: 'users',
});

mongoose.Promise = global.Promise;
export default mongoose.model('User', UserSchema);
