const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },

});

var Users = mongoose.model('User', userSchema);

module.exports = Users;