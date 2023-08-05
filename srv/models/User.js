const mongoose = require('mongoose')

const UserModel = mongoose.Schema({
    nama: {
        type: String,
        minLength: 1,
        maxLength: 40,
        required: true
    },
    nip: {
        type: String,
        minLength: 1,
        maxLength: 40,
        required: true
    },
    seksi: {
        type: String,
        minLength: 1,
        maxLength: 40,
        required: true
    },
    pws: {
        type: String,
        maxLength: 255
    },
    role: {
        type: String,
        maxLength: 255
    }
}, { collection: 'Users' })

module.exports = mongoose.model('Users', UserModel)



