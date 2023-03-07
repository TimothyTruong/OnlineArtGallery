import pkg from 'mongoose';
const {Schema, model } = pkg;

let artworkSchema = Schema({
    name: String,
    artist: String,
    year: Number,
    medium: String,
    category: String,
    description: String,
    image: String,

    reviews: {
        type: [String], //array of objects with keys: id to the review
        default: [],
        required: false
    }, //array of reviews for this artwork
    likes: {
        type: [String],
        default: [],
        required: false
    }    //array of users who like this artwork
})

export default model('Artworks', artworkSchema);