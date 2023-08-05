const mongoose = require('mongoose')

const carmod = mongoose.Schema({
    _id: {
        type: String,
        unique: true,
    },
    mulai: {
        type: String,
        minLength: 0,
        maxLength: 100
    },
    akhir: {
        type: String,
        minLength: 0,
        maxLength: 100
    }
})

const CarModel = mongoose.Schema({
    jenis: {
        type: String,
        minLength: 1,
        maxLength: 40,
        required: true
    },
    plat: {
        type: String,
        maxLength: 255
    },
    peminjaman: {
        type:[carmod],

    }
}, { collection: 'CarModel' })

module.exports = mongoose.model('CarModel', CarModel)
