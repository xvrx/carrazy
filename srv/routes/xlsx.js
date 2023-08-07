const route = require('express').Router()
const xlsx = require('xlsx')
const express = require('express')
const records = require('../models/Master')
const verify = require('../mdw/verify')

const fs = require('fs');





route.get('/', verify, async (req, res) => {
    const {user, role} = req.session

    let attached;
    
    if (role === 'admin') {
        attached = await records.find({status: {$not: /waiting/}}).sort({ _id: -1 })
    } else {
        attached = await records.find({status: {$not: /waiting/}, nip_pic : user}).sort({ _id: -1 })
    }

    if (attached.length === 0) {
        res.status(400).json(
            {message:"No records found!"}
        )
    } else {
        try {
            const file = attached
            // console.log(file)
            if (!file) return res.status(404).json({ message: 'request body is not available!' })
            const stripped = []
            
            await file.forEach((obj, idx) => stripped.push(
                {
                    jenis : obj?.jenis,
                    nost : obj?.nost,
                    tglst : obj?.tglst,
                    // pengguna : ,
                    Alamat : obj.pengguna.toString(),
                    mulai : obj?.mulai,
                    akhir : obj?.akhir,
                    nond: obj?.nond,
                    tglnd: obj?.tglnd,
                    plat: obj?.plat, 
                    pic: obj?.pic, 
                    nip_pic: obj.nip_pic ,
                    seksi:obj?.seksi,
                    status:obj?.status
                }
            ))
            
            let stringify = await JSON.parse(JSON.stringify(stripped))
            const newBook = xlsx.utils.book_new()
            const newSheet = xlsx.utils.json_to_sheet(stringify)
            
            xlsx.utils.book_append_sheet(newBook, newSheet, 'Peminjaman')
            const excelBuffer = xlsx.write(newBook, { type: 'buffer' });
            res.setHeader('Content-Disposition', 'attachment; filename=peminjaman.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            // Send the Excel file as the response
            res.write(excelBuffer);
            res.send();
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message })
        }
    }

})


module.exports = route