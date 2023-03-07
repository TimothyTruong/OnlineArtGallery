import pkg from 'mongoose';
const {Schema, model } = pkg;

let userSchema = Schema({
    userid: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    name: String,
    accType: {
        type: String,
        default: 'patron'
    }, //patron or artist

    following: {
        type: [Number],
        default: [],
        required: false
    }, //array of users this user is following

    artworks: {
        type: [String]
    }, //array of artworks this user has created

    reviewed: {
        type: [String],
        default: [],
        required: false
    }, //array of artworks this user has reviewed

    liked: {
        type: [String],
        default: [],
        required: false
    } //array of artworks this user has liked

})

export default model('Users', userSchema);