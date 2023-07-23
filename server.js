"use strict";
const express = require('express');
const connectDb = require('./routes/mongoApi.routes')
const cors = require('cors');
const axios = require("axios");
require("dotenv").config();
const {PORT} = require("./config");
const authRouter = require("./routes/auth.routes");
const handleErrorServer = require("./error_handlers/500");
const handleErrorNotFound = require("./error_handlers/404");
const myJobsdb=require("./routes/myJobs.routes");
const client = require("./clinet");
const apis=require("./routes/api.routes");

connectDb();

const app = express();
app.use(cors());
app.use(express.json()); 




/////// 
app.use(authRouter);

///////
app.use('/jobs',myJobsdb)
app.use("/getAllJobs",apis);



/////////// Handle Error Routes

app.use(handleErrorServer);
app.use(handleErrorNotFound);




// const { MongoClient } = require('mongodb');

// // Create a MongoClient
// async function main() {
//   const uri =
//     "mongodb+srv://mohamadsamara:mohamad1999@cluster0.pwdp4gm.mongodb.net/?retryWrites=true&w=majority&ssl=true";
//   const mongClient = new MongoClient(uri);
//   try {
//     await mongClient.connect();
//     await listDatabases(mongClient);
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await mongClient.close();
//   }
// }
// main().catch(console.error);

// async function listDatabases(mongClient) {
//   const databasesList = await mongClient.db().admin().listDatabases();
//   console.log("Databases: ");
//   databasesList.databases.forEach((db) => {
//     console.log(`- ${db.name}`);
//   });
// }









// client.connect().then(()=>{
//     app.listen(PORT , ()=>{
//     console.log(`Running at ${PORT} Port`);
//         });
//   });
