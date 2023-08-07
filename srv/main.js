// express basic boilerplate
const express = require('express')
const app = express()
const port = 2000
const mongoose = require("mongoose");
// const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
// const fs = require("fs");
const path = require("path");
const master = require('./models/Master')
// dotenv.config();

// turn off the annoying shit
mongoose.set('strictQuery', false);

// middleware for serving static files
app.use("/cars", express.static(__dirname + '/cars'));

// app.use(
//   "/static/profile",
//   express.static(path.join(__dirname, "static/profile"))
// );


// init cron
const cron = require('node-cron');

// Function to be executed every day at 7 AM from Monday to Friday
const task = () => {
    // Your function logic here
    console.log('rungkad moment!')
  };

const cronOpt = {
  scheduled: true, //default value
  timezone: "Asia/Jakarta"
}
  // Schedule the task using cron syntax (runs every day at 7 AM from Monday to Friday)
  // cron Options to define timeZone
  cron.schedule('46 18 * * 1-5', task, cronOpt);


  // loop through undone record, adjust status with current date
  async function doLoop () {
    const masterRecord = await master.find({status: {$not: /done/}})
    const now = new Date()

    masterRecord.forEach(record => {
      const {mulai,akhir} = record
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
    });

  }

  doLoop()



app.use(express.json())
app.use(
  cors({
    // origin: "http://10.29.63.250:3000",
    origin: [
      // "*"
      "http://localhost:3000",
      "http://10.29.63.250:3000",
    ],
    // origin: "http://10.13.1.63:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
    credentials: true,
  })
);






  // configuring session!

  const sessionStore = new MongoStore({
    // use existing mongoDB connection
    mongoUrl: "mongodb://127.0.0.1:27017/carrazy",
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
// const cetak = require("./routes/cetak");
// const downloadXls = require("./routes/xlsx");
// const masterfile = require("./routes/masterfile.js");


//USE ROUTER
app.use("/api", main_api);
app.use("/auth", auth);
app.use("/xlsx", xlsx);
// app.use("/xlsx", xlsx);




async function connectDB(MONGO_URL,db_options) {
  try {
    await mongoose.connect(MONGO_URL, db_options);
  } catch (error) {
    console.log(error);
  }
}


// try {



mongoose
  .connect("mongodb://127.0.0.1:27017/carrazy", {
    // disable following option to prevent error upon db connection failure
    serverSelectionTimeoutMS: 3000,
  })
  .then(() => {
    console.log("carrazy is connected to the database!");
    app.listen(2000, () => console.log(`carrazy is on https://localhost:${port}`));
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    app.listen(2000, () => console.log(`carrazy is on https://localhost:${port}`));
  });

// Your routes and middleware setup should go here
// Example: app.use("/api", apiRouter);

