const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    giftTo: {
        type: String
    },
    giftFrom: {
        type: String
    }
})

module.exports = mongoose.model("User", UserSchema, "users")
