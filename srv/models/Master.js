const mongoose = require('mongoose')

const PeminjamanModel = mongoose.Schema({
    jenis: {
        type: String,
        minLength: 1,
        maxLength: 50,
        required: true,
    },
    plat: {
        type: String,
        minLength: 1,
        maxLength: 70,
        required: true
    },
    nost: {
        type: String,
        minLength: 1,
        maxLength: 70,
        required: true
    },
    tglst: {
        type: String,
        minLength: 1,
        maxLength: 150,
        required: true
    },
    nip_pic: {
        type: String,
        minLength: 1,
        maxLength: 150,
        required: true
    },
    pic: {
        type: String,
        minLength: 1,
        maxLength: 150,
        required: true
    },
    seksi: {
        type: String,
        minLength: 1,
        maxLength: 150,
        required: true
    },
    pengguna: {
        type: Array
    },
    mulai: {
        type: String,
        minLength: 1,
        maxLength: 150,
        required: true
    },
    akhir: {
        type: String,
        minLength: 1,
        maxLength: 150,
        required: true
    },
    status: {
        type: String,
        minLength: 1,
        maxLength: 150,
        required: true
    },
    nond: {
        type: String,
        minLength: 1,
        maxLength: 150,
        required: true
    },
    tglnd: {
        type: String,
        minLength: 1,
        maxLength: 150,
        required: true
    },

    
}, { collection: 'Peminjaman' })

module.exports = mongoose.model('Peminjaman', PeminjamanModel)