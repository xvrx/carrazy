// require("C:\\Users\\bruhnigga\\AppData\\Roaming\\npm\\node_modules\\node-windows")
const Service = require('node-windows').Service;
// const Service = require("C:\\Users\\bruhnigga\\AppData\\Roaming\\npm\\node_modules\\node-windows")

// # DB
// DB_URL = "mongodb://127.0.0.1:27017/carrazy"
// EXPRESS_PORT = "2000"


// # allowed Origin
// ORIGIN_1 = "http://localhost:3000"
// ORIGIN_2 = "http://10.29.63.250:3000"
// ORIGIN_3 = "http://localhost:3000"

// CRON_SCHEDULE = "26 06 * * 1-5"

const svc = new Service({
    name: 'Carrazy',
    description: 'Fleet management and mental disorder.',
    script: 'D:\\pinjambrok\\srv\\main.js'
  });

  console.log(process.env.CRON_SCHEDULE)
  svc.on('install', () => {
    svc.start();
  });
  svc.install();