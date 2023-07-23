"use strict";
const express = require('express');
const cors = require('cors');
require("dotenv").config();
const {PORT} = require("./config");
const authRouter = require("./routes/auth.routes");
const handleErrorServer = require("./error_handlers/500");
const handleErrorNotFound = require("./error_handlers/404");
const myJobsdb=require("./routes/myJobs.routes");
const client = require("./clinet");
const apis=require("./routes/api.routes");



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


client.connect().then(()=>{
    app.listen(PORT , ()=>{
    console.log(`Running at ${PORT} Port`);
        });
  });
