const router = require('express').Router()
// const xlsx = require('xlsx')
const masterModel = require('../models/Master')
const Users = require('../models/User')
const carModel = require('../models/CarModel')
// const { parse } = require('dotenv')
// const dateUtils = require('../utils/dateUtils')
const verify = require('../mdw/verify')
const mongoose = require('mongoose')



// utils
const { ifSliced, normalizeDate, checkIfDateSliced } = require('../util')

const currentDate = new Date()
// const currentDate = new Date("2023-03-24")


router.get('/', async (req, res) => {
    
    // const attached = req.body
    // console.log('attachment: ',attached)
    res.status(200).json({message: 'nigga sonic teenage warhead!'})
})


// get user profile
router.get('/profile', verify, async (req, res) => {
    // console.log(req.sessionID)
    const id = req?.session?.user
    // check if session id exist in session model in database
    const currentUser = await Users.findOne({nip : id })
    // console.log(currentUser)
    if (!currentUser) return res.status(404).json({ message: `session not valid!`, login: false })
    res.status(200).json({
       profile: {
        nama : currentUser.nama,
        nip : currentUser.nip,
        seksi : currentUser.seksi,
        role: currentUser.role
       },
        currentDate : currentDate
    })
})

// initiate main data
router.get('/peminjaman', verify, async (req, res) => {
    if (req.session.role === 'admin') {
        const pinjam_waiting = await masterModel.find({status:'waiting'})
        // find where email is not {email: {$not: /@domain.com/}}
        // total records
        const tot = await masterModel.countDocuments({status: {$not: /waiting/}})
        // previously filtered by most recent ST
        const historee = await masterModel.find({status: {$not: /waiting/}}).sort('-_id').limit(5)

        //  get car model
        // console.log('admin API call:', historee)
        const carMod = await carModel.find({})


        res.status(200).json({
            mainData : pinjam_waiting.concat(historee),
            tot : tot,
            carMod : carMod,
            history_lt : historee.length
        })
    } else if (req.session.role === 'user') {
        const pinjam_waiting = await masterModel.find({status:'waiting', nip_pic : req.session.user})
        // find where email is not {email: {$not: /@domain.com/}}
        // total records
        const tot = await masterModel.countDocuments({status: {$not: /waiting/}, nip_pic: req.session.user})
        // previously filtered by most recent ST
        const historee = await masterModel.find({status: {$not: /waiting/}, nip_pic : req.session.user}).sort({_id : -1}).limit(5)
        const carMod = await carModel.find({}) 
        
        res.status(200).json({
            mainData : pinjam_waiting.concat(historee),
            tot : tot,
            carMod : carMod,
            history_lt : historee.length
        })
    }
})

// search history
router.get('/search/:prompt', verify ,async(req,res) => {
    console.log(req.session.user, `search for ${req.params.prompt}`)
    const {role, user} = req.session
    // console.log(req.query)
    const { startpoint } = req.query
    const regPattern = req.params.prompt
    // console.log(`search for string: ${regPattern}`)
    // console.log('from start point: ', req.query)

    const pattern = { $regex: new RegExp(regPattern), $options: 'i' }
    const criteria = { 
       status: {$not: /waiting/},
       $or: [
            {"jenis" : pattern},
            {"plat" : pattern},
            {"seksi" : pattern},
            {"pic" : pattern},
            {"nip_pic" : pattern},
            {"nost" : pattern},
            {"nond" : pattern},
            {"pengguna" : [pattern]},
            {"mulai" : pattern},
            {"akhir" : pattern},
            {"status" : pattern},
            {"tglst" : pattern},
            {"tglnd" : pattern},
        ]
    }

    if (role === 'admin') {
        // query for admin
        const tot = await masterModel.countDocuments(criteria)
        
        const a = await masterModel.find(criteria)
            .sort({ _id: -1 })
            .skip(startpoint)
            .limit(10);

        // console.log('admin search: ','from start point: ', startPoint, typeof a, a,  )
        
        if (a !== null) {
            res.status(200).json({mainQuery:a, tot: tot})
        } else {   
            res.status(400).json({message:'prompted search not found!'})
        }
    } else {
        // if user request for history; only query for the user's records
        criteria.nip_pic = user
        // console.log(criteria)
        const tot = await masterModel.countDocuments(criteria)

        const a = await masterModel.find(criteria)
            .sort({ _id: -1 })
            .skip(startpoint)
            .limit(10);

            // console.log(a)
        // console.log('user search: ', typeof a, a)
        // console.log('from start point: ', startPoint)
        if (a !== null) {
            res.status(200).json({mainQuery:a, tot:tot})
        } else {
            res.status(200).json({message:'not found'})
        }
    }

})


// add new data
router.post('/peminjaman', verify, async (req, res) => {
    console.log(req.session.user, 'add attempt')

    const rec = req?.body?.newrec
    // const modelCar = await carModel.find({})
    const carmod = await carModel.findOne({plat : rec.plat})
    
    // // check if dates overlap
    const rng = [new Date(normalizeDate(rec.mulai)), new Date(normalizeDate(rec.akhir))]
        let overlap = false

        for (let i = 0; i < carmod.peminjaman.length; i++) {
          const x = carmod.peminjaman[i]
          
          const y = [new Date(normalizeDate(x.mulai)),  new Date(normalizeDate(x.akhir))] || '';
          if (checkIfDateSliced(rng,y)) {
            overlap = true
            console.log(req.session.user, 'intended date overlapped!')
            break
            
          } else {
            continue
          }
        };

    if (overlap) res.status(400).send('start/end date is overlap with an existing record!')

    if (rec) {
        try {
            // console.log(req?.body?.newrec)
            const newdat = new masterModel(rec);
        
            // get newly saved id
            const idx = newdat._id.toString()
            
            // console.log('model : ', newdat._id.toString())

            // update car model
            
            // const carmod = modelCar.filter((car) => car.plat === rec.plat)
            const peminjamanRecord = {
                _id : idx,
                mulai : rec.mulai,
                akhir : rec.akhir
            }

            // replace user nip
            newdat.nip_pic = req.session.user

            // push new carmodel record
            carmod.peminjaman.push(peminjamanRecord)

            // await carModel.findByIdAndUpdate(, {peminjaman : carmod.peminjaman })
            try {
                // save data (peminjaman)
                await newdat.save();
                // update car model
                carModel.findByIdAndUpdate(carmod._id,  {peminjaman : carmod.peminjaman }, { new: true }, (err, newRec) => {
                  if (err) {
                    res.status(500).json({ message: "car model failed to update!" });
                  } 
                  else {
                    res.status(200).json({
                        peminjaman : newdat,
                        carId : carmod._id,
                        newCarModel : carmod.peminjaman
                    })
                  }
                });
              } catch (error) {
                console.log(req.session.user, error);
                res
                  .status(500)
                  .json({ message: "failed to update data, server unreachable!" });
              }

        } catch (error) {
            console.log(req.session.user, error)
            res.status(400).send(error)
        }
    } else {
        res.status(400).send('post / peminjaman : data received error')
    }
})


// approve existing data

router.patch('/update/:id', verify, async (req, res) => {
    const id = req.params.id;
    const {user, role} = req.session;
    const payload = req.body;
    const now = new Date(normalizeDate(currentDate));
    const mulai = new Date(payload.mulai);
    const akhir = new Date(payload.akhir);

    // previously assigned car (db version)
    const prevCar = await masterModel.findById(id);

    // car mod (current/payload version)
    const carmod = await carModel.findOne({plat : payload.plat});

    //  authority ?
    if (role !== 'admin') return res.status(400).json({message:'you are an unauthorized scum!'})
    
    console.log(req.session.user, `approving ${req.params.id}`)

    const ifGoingon = ifSliced(now, {mulai,akhir});
    const ifApproved = now < mulai;
    const ifDone = now > akhir

    // update peminjaman record status
    if(ifGoingon) {
        payload.status = "ongoing"
    } else if(ifApproved) {
        payload.status = "approved"
    } else if(ifDone) {
        payload.status = "done"
    }


    // check if previous and current car model are the same

    // if car model is modified
    if (carmod.plat !== prevCar.plat) {
        // console.log('car is modified...')
        // before adding new records to new car model, make sure time is not overlap to any existing rec in car model
        const rng = [new Date(normalizeDate(payload.mulai)), new Date(normalizeDate(payload.akhir))]
        let overlap = false

        for (let i = 0; i < carmod.peminjaman.length; i++) {
            const x = carmod.peminjaman[i]
            
            const y = [new Date(normalizeDate(x.mulai)),  new Date(normalizeDate(x.akhir))] || '';
            if (checkIfDateSliced(rng,y)) {
                overlap = true
                console.log('date overlapped!')
                break
            } else {
                continue
        }};

        // replace user nip ?
        // payload.nip_pic = req.session.user

        if (overlap) {
            res.status(400).send('start/end date is overlap with an existing record!')
        } else {
            // console.log('no overlap found, continuing process..')
            // delete old car model record
            const prevModel =  await carModel.findOne({plat : prevCar.plat});
            const prevIdx = prevModel.peminjaman.findIndex(edx => edx._id === id)
            prevModel.peminjaman.splice(prevIdx, 1)
            carModel.findByIdAndUpdate(prevModel._id,  { peminjaman : prevModel.peminjaman },{new:true} ,(err, newCar) => {
                if (err) {
                    console.log(req.session.user, err)
                res.status(500).json({ message: `failed to delete old car model : ${err}`  });
                } else {
                    // console.log(
                    //     'deleted old car model in',
                    //     newCar.jenis
                    //     )

                    // update main data and car model
                    // console.log('proceeding to update main data')
                    masterModel.findByIdAndUpdate(id, payload, { new: true })
                    .then((x,y) => {
                        
                        // add new rec in newcar Model
                        const peminjamanRecord = {
                            _id : id,
                            mulai : payload.mulai,
                            akhir : payload.akhir
                        }
                        // push new carmodel record
                        carmod.peminjaman.push(peminjamanRecord)

                        carModel.findByIdAndUpdate(carmod._id,  {peminjaman : carmod.peminjaman }, { new: true }, (err, newCar) => {
                                if (err) {
                                res.status(500).json({ message: "car model failed to update! (modified on approval)" });
                                } else {
                                res.status(200).json({
                                message:'Car record is succesfully updated! (modified car model upon approval)',
                                    peminjaman : x,
                                    carId : carmod._id,
                                    carModel_peminjaman : newCar
                            })
                        }})
                    })
                    .catch((err) => {
                        (req.session.user,err)
                        res.status.send('failed updating mastermodel')
                    })
            }})

           
        }
        
    // if unmodified
    } else {
        // console.log('car is unmodified...')
        let carIdx;
        // update car modoel mulai & akhir in carmod
        carIdx = carmod.peminjaman.findIndex((x) => x._id === payload._id)

        // console.log(carmod)
        if (ifDone) {
            // console.log('done is true, get rid of carmodel record')
            carmod.peminjaman.splice(carIdx, 1);
        } else {
            carmod.peminjaman[carIdx].mulai = payload.mulai
            carmod.peminjaman[carIdx].akhir = payload.akhir
        }

        // console.log('peminjaman list: ',carmod.peminjaman)
        // console.log('ifgoingon:',ifGoingon )
        // console.log('approved:',ifApproved )
        // console.log('done:',ifDone )
        // console.log('payload: ',payload)

        if (
            payload !== null &&
            carmod !== null
        ) {
            try {
                // const intended = await masterModel.findById(id)
                // console.log(id)
                // console.log(intended)
                masterModel.findByIdAndUpdate(id, payload, { new: true })
                    .then((x,y) => {
                        
                        // update car Model
                        carModel.findByIdAndUpdate(carmod._id,  {peminjaman : carmod.peminjaman }, { new: true }, (err, newCar) => {
                            if (err) {
                            res.status(500).json({ message: "car model failed to update!", error: err });
                            } else {
                    
                            res.status(200).json({
                            message:'Car record is succesfully updated!',
                                peminjaman : x,
                                carId : carmod._id,
                                carModel_peminjaman : newCar
                                
                            })
                        }})
                    })
                    .catch((err) => {
                        console.log(req.session.user, err)
                        res.status.send('failed updating mastermodel')
                    })
            } catch (error) {
                console.log(req.session.user, error)
                res.status(500).json({ message: "failed to update data in DB!" });
            }
        } else {
            res.status(400).json({message:"request payload is insufficient!"})
        }
    }

    // res.status(200).send('oke')
})


// reject
router.patch('/reject/:id', verify, async (req, res) => {
    console.log(req.session.user, `rejecting ${req.params.id}`)
    const id = req.params.id
    const {user, role} = req.session

    // console.log(id, user, role)
    const payload = await masterModel.findById(id)
    const carmod = await carModel.findOne({plat : payload.plat})

    if (role === 'admin') {
        masterModel.findByIdAndUpdate(id,  {status : 'rejected' }, { new: true }, (err, peminjaman_new) => {
            if (err) {
              res.status(500).json({ message: "main model failed to update!" });
            } else {
                // find peminjaman index in carmodel
                   const caridx = carmod.peminjaman.findIndex(idc => idc._id === id)
                // get rid of rejected index from car model
                   carmod.peminjaman.splice(caridx,1)

                // update car model
                // if idx is found    
                  if (caridx !== -1) {
                    carModel.findByIdAndUpdate(carmod._id,  {peminjaman : carmod.peminjaman }, { new: true }, (err, newCar) => {
                        if (err) {
                          res.status(500).json({ message: "car model failed to update!" });
                        } else {
                            res.status(200).json({
                            message:'Car record is succesfully updated!',
                                peminjaman : peminjaman_new,
                                carId : carmod._id,
                                carModel_peminjaman : newCar
                            })
                            }
                        })
                  } else {
                    res.status(200).json({message:'record is not found in car model, updated main data whatsoever!'})  
                  }
            }})
        // res.status(200).send('ok')  
    } else {
        res.status(400).send({message:'cannot reject, your role is unauthorized'})
    }


    // res.status(200).send({message:'cannot reject, your role is unauthorized'})
})



// delete
router.delete('/del/:id', verify, async (req, res) => {
    console.log(req.session.user, `deleting ${req.params.id}`)
    const id = req.params.id
    const {user, role} = req.session

    const payload = await masterModel.findById(id)

    if (
        (user === payload.nip_pic) || (role === 'admin')
    ) {
        masterModel.findByIdAndDelete(id, function (err, docs) {
            if (err){
                console.log(req.session.user, err)
                res.status(500).json({message:err})
            }
            else{
                // console.log("Deleted : ", docs._id);
                res.status(200).json({message: `got rid of : ${id}!`})
            }
        });
    } else {
        res.status(500).json({message:"user unauthorized!"})
    }
  

})

// set as done
router.patch('/done/:id', verify, async (req, res) => {
    console.log(req.session.user, `set as done : ${req.params.id}`)
    const id = req.params.id
    const {user, role} = req.session
    // console.log("id: ", id)
    // console.log("user: ", role)
    const payload = await masterModel.findById(id)
    const carmod = await carModel.findOne({plat : payload.plat})

    if (role === 'admin' && (payload.status === 'approved' || payload.status === 'ongoing')) {
        masterModel.findByIdAndUpdate(id,  {status : 'done' }, { new: true }, (err, peminjaman_new) => {
            if (err) {
              res.status(500).json({ message: "main model failed to update!" });
            } else {
                // find peminjaman index in carmodel
                   const caridx = carmod.peminjaman.findIndex(idc => idc._id === id)
                // get rid of rejected index from car model
                   carmod.peminjaman.splice(caridx,1)

                // update car model
                // if idx is found > get rid of it
                  if (caridx !== -1) {
                    carModel.findByIdAndUpdate(carmod._id,  {peminjaman : carmod.peminjaman }, { new: true }, (err, newCar) => {
                        if (err) {
                          res.status(500).json({ message: "car model failed to update to 'done'" });
                        } else {
                            res.status(200).json({
                            message:'Car record is succesfully set as done!',
                                peminjaman : peminjaman_new,
                                carId : carmod._id,
                                carModel_peminjaman : newCar
                            })
                            }
                        })
                  } else {
                    res.status(200).json({message:'record is not found in car model, updated main data whatsoever!'})  
                  }
            }})
        // res.status(200).send('ok')  
    } else {
        res.status(400).send({message:'cannot update as done, youre either an unauthorized scum', altMessage: "you're trying to update neither approved/ongoing record"})
    }

})


// load more history
router.get('/loadmore', verify, async (req, res) => {
    const startPoint = parseInt(req?.query?.startingPoint) 
    const { user, role} = req.session
    

    if (role === 'admin') {
        const historee = await masterModel
                .find({status: {$not: /waiting/}})
                .sort({_id : -1})
                // .sort({$natural:1})
                .limit(5)
                .skip(startPoint)

        res.status(200).json({
            mainData : historee
        })

    } else if (role === 'user') {
        const historee = await masterModel
                .find({status: {$not: /waiting/}, nip_pic: user})
                .sort({_id:-1})
                // .sort({$natural:1})
                .limit(5)
                .skip(startPoint)
        // console.log(pinjam_waiting, historee)
    
        res.status(200).json({
            mainData : historee
        })
    } else {
        res.status(400).json({
            message : 'invalid user role!'
        })
    }
})

router.get('/queryFor/:id', verify, async (req, res) => {
    id = req.params.id
    const queried = await masterModel.findById(id)
    if (queried._id) {
        res.status(200).json({queried:queried})
    } else {
        res.status(400).json({message:`can't find id of : ${id}`})
    }
})


module.exports = router