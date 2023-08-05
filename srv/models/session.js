const mongoose = require('mongoose')

const SessionModel = mongoose.Schema({
    _id: {
        type: String
    },
    expires: {
        type: Date
    },
    session: {
        type: String
    }
}, { collection: 'sessions' })

module.exports = mongoose.model('sessions', SessionModel)