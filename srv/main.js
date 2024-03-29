// express basic boilerplate
const express = require('express')
const app = express()
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const fs = require("fs");
const master = require('./models/Master')
const path = require('path')
const { ifSliced } = require('./util')
const {DB_URL, PORT, CRON_SCHEDULE, USE_BUILD_DIRECTORY, SERVER_ORIGIN_1} = require('./config')
const dotenv = require('dotenv')
dotenv.config();
// turn off the annoying shit
mongoose.set('strictQuery', false);
// middleware for serving static files
app.use("/cars", express.static(__dirname + '/cars'));

// current date
const now = new Date()
// init cron
const cron = require('node-cron');
// Function to be executed every day at 7 AM from Monday to Friday
const task = () => {
    // Your function logic here
    console.log('6 AM database update')
    updateStatus()
  };

const cronOpt = {
  scheduled: true, //default value
  timezone: "Asia/Jakarta"
}
  // Schedule the task using cron syntax (runs every day at 7 AM from Monday to Friday)
  // cron Options to define timeZone
  cron.schedule(CRON_SCHEDULE, task, cronOpt);


  // loop through undone record, adjust status with current date
  async function updateStatus () {
    // only update for records other than done or rejected
    let masterRecord = await master.find({ status: { $nin: ['done', 'rejected', 'waiting'] } })
    
    // store overtime records
    let updateDone = [];

    // loop and adjust tanggal mulai * akhir to record status
    await masterRecord.forEach(record => {
      const mulai = new Date(record.mulai)
      const akhir = new Date(record.akhir)

      const ifGoingon = ifSliced(now, {mulai,akhir});
      const ifApproved = now < mulai;
      const ifDone = now > akhir
  
      // update peminjaman record status
      if(ifGoingon) {
          record.status = "ongoing"
      } else if(ifApproved) {
          record.status = "approved"
      } else if(ifDone) {
          record.status = "done"
          updateDone.push({id : record._id, plat : record.plat})
      }
    });
    
    // bulk update main records
    masterRecord.forEach(x => {
      master.findByIdAndUpdate(x._id, x,{new:true} ,(err, newCar) => {
        if (err) {
        console.log(`failed to update record : ${x._id}`);
        // log error
       fs.appendFile('errlog.txt', `failed to update record : ${x._id}`, (err) => {
          if (err) {
              console.error('Error writing to log file:', err);
        }}) 
  
        } else {
            console.log('updated main record :', x._id, "status to: ", x?.status)
    }})
    })

    // console.log(updateDone)
    // if status is done
    // get rid of carModel
    for (const x of updateDone) {
      try {
        const idc = x.id.toString()
        mod = await CarModel.findOne({plat:x.plat})
        
        idx = mod.peminjaman.findIndex(e => e._id === idc)
        mod.peminjaman.splice(idx, 1)
        
        // update car in database
        await mod.save()
        console.log(`carmodel.peminjaman removed : ${idc}`)
      } catch (error) {
        console.log(`failed to remove car model for: ${x.id.toString()}`,error)
        fs.appendFile('errlog.txt', `failed to remove car model for: ${x.id.toString()}, ${error.toString()}`, (err) => {
          if (err) {
              console.error('Error writing to log file:', err);
        }})
      }
    }

    console.log('peminjaman data is updated, please take notice of any error in errlog.txt')
  }

  




app.use(express.json())
app.use(
  cors({
    // origin: "http://10.29.63.250:3000",
    origin: [
      "*",
      // SERVER_ORIGIN_1,
    //   // process.env.ORIGIN_2,
    ],
    // origin: "http://10.13.1.63:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
    credentials: true,
  })
);






  // configuring session!

  const sessionStore = new MongoStore({
    // use existing mongoDB connection
    mongoUrl: DB_URL,
    collection: "sessions",
  });


app.use(
  session({
    name: "bruh-cookies",
    secret: "loder kotong",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    rolling: true,
    cookie: {
      // only use cookie for https
      secure: false,
      
      //
      // sameSite: 'strict',

      // reset cookie duration when session is invoked
      rolling: true,
      
      //
      // httpOnly: false,

      // if browser is closed, delete the cookie
      ephemeral: true,

      // cookie productive duration
      maxAge: 1000 * 3600,
    },
  })
);




//! IMPORT ROUTER
const main_api = require("./routes/main_api.js");
const auth = require("./mdw/auth.js");
const xlsx = require("./routes/xlsx.js");
const CarModel = require('./models/CarModel');
// const cetak = require("./routes/cetak");
// const downloadXls = require("./routes/xlsx");
// const masterfile = require("./routes/masterfile.js");


//USE ROUTER
app.use("/api", main_api);
app.use("/auth", auth);
app.use("/xlsx", xlsx);
// app.use("/xlsx", xlsx);

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));


// SERVE REACT WITH EXPRESS (optional)
// COPY REACT BUILD FOLDER INTO THIS DIRECTORY - Serve the index.html file for all other requests

if (USE_BUILD_DIRECTORY) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}


mongoose
  .connect(DB_URL, {
    // disable following option to prevent error upon db connection failure
    serverSelectionTimeoutMS: 3000,
  })
  .then(() => {
    console.log("carrazy is connected to the database!");
    app.listen(2000, () => console.log(`carrazy is on https://localhost:${PORT}`));
    // app.listen(2000, () => console.log(`carrazy is on https://localhost:${parseInt(process.env.EXPRESS_PORT)}`));
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    app.listen(2000, () => console.log(`carrazy is on https://localhost:${PORT}`));
    // app.listen(2000, () => console.log(`carrazy is on https://localhost:${parseInt(process.env.EXPRESS_PORT)}`));
  });


