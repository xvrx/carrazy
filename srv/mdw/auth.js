const route = require('express').Router()
const masterModel = require('../models/Master')
const carModel = require('../models/CarModel')
const { parse } = require('dotenv')
const UserModel = require('../models/User')
const verify = require('./verify')


// initiate login
route.post("/login", async (req, res) => {
  const attempt = req.body;
  // console.log('attempt :',attempt)
  if (!attempt.user)
    return res
      .status(404)
      .json({
        title: "Invalid User",
        desc: "please input a valid user credential!",
      });
  if (!attempt.key)
    return res
      .status(404)
      .json({
        title: "Invalid User",
        desc: "please input a valid user credential!",
      });
  try {
    // cek nip
    const result = await UserModel.findOne({ nip: attempt.user }).exec();
    // console.log(result)
    if (result === null || result === undefined)
      return res
        .status(404)
        .json({ title: "Invalid User", desc: "wrong username/password!" });
    
    // activity logger
    // console.log(`${result.nama} attempted logged in at ${new Date()}`);

    if (result.nip === attempt.user && result.pws === attempt.key) {
      req.session.login = true;
      req.session.user = req.body.user;
      // fetch role
      try {
        req.session.role = result.role;
        req.session.nama = result.nama;
        res.status(200).json({ status: true });
      } catch (error) {
        console.log('failed to assign role :',error);
        res.status(400).send("user not found!");
      }
    } else {
      res
        .status(404)
        .json({ title: "Invalid User", desc: "wrong username/password!" });
    }
  } catch (error) {
    console.log("error on session verification :",error);
    if (error.toString().includes("ECONNREFUSED"))
      return res
        .status(404)
        .json({
          title: "DB Error",
          desc: "contact the admin to turn on the DB!",
        });
    return res
      .status(404)
      .json({
        title: "DB Error",
        desc: "contact the admin to turn on the DB!",
      });
  }
});

// route to verify cookie
route.get('/verify', verify , async(req,res) => {
  
  // if cookie made it through middleware (verify), send 200 ok
  res.status(200).json({stat: true})
  // console.log('verification success for', req.session.user)
})

// destroy cookie (log out)
route.post("/destroy", (req, res) => {
  if (req.session.login) {
    req.session.destroy((err) => {
      if (err) throw err;
      res.json({ stat: true });
    });
  } else {
    res.status(400).send("emg belum login bang :D!");
  }
});



// route.get("/login", async (req, res) => {
//     if (req.session.login == true) {
//       try {
//         const host = req.get('host')
  
//         const user = req?.session?.user;
//         const bruh = await UserIDModel.findOne({ nip: user }).exec();
//         const sourceRef = await SourceID.findOne({}).exec();
//         // console.log("source found: ", sourceRef)
//         const a = sourceRef
//         if (a) {
//           const a = sourceRef
//           a.current = new Date()
//           const picUrl = 'http://'+host+bruh?.pics
//           bruh.pics = picUrl
    
//           res.status(200).json({
//             stat: true, 
//             data: bruh,
//             source: a
//           });
//         } else {
//           res.status(502).json({message:"Database error upon setting up time, target, year etc references..."})
//         }
//       } catch (error) {
//         console.log(error);
//         res
//           .status(400)
//           .json({ stat: false, message: "failed to match any user!" });
//       }
//     } else {
//       res
//         .status(400)
//         .json({ stat: false, message: "credential is not available!" });
//     }
//   });
  

module.exports = route