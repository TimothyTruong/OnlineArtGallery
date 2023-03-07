import pkg from 'mongoose';
const {Schema, model } = pkg;

let reviewSchema = Schema({
    artwork: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    
    reviewText: {
        type: String,
        required: true
    },
})

export default model('Reviews', reviewSchema);