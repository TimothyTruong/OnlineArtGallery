import pkg from 'mongoose';
const {Schema, model } = pkg;

let workshopSchema = Schema({
    title: {
        type: String,
        required: true 
    },
    hostedBy: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    enrolled: {
        type: [String],
        default: []
    },
    description: {
        type: String
    }
});

export default model('Workshops', workshopSchema);