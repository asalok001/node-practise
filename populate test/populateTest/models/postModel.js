const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    post: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    }
});

var Posts = mongoose.model('Post', postSchema);

module.exports = Posts;