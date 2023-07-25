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
const axios = require("axios");


const app = express();
app.use(cors());
app.use(express.json()); 

client.connect().then(()=>{
    app.listen(PORT , ()=>{
    console.log(`Running at ${PORT} Port`);
        });
  });



/////// myjobs table
app.use('/jobs',myJobsdb)

///// api data
app.use("/jobSearch",apis);

/////// sing up and login 

app.use(authRouter);

/////////// Handle Error Routes

// app.patch('/update', (req, res) => {
//   let { about } = req.body;
//   let data = JSON.stringify({
//     app_metadata: { about },
//   });

//   let config = {
//     method: 'patch',
//     url: 'https://login.auth0.com/api/v2/users/google-oauth2%7C100737014092563339568',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     data: data,
//   };

//   axios(config)
//     .then((response) => {
//       console.log(JSON.stringify(response.data));
//       res.status(200).json({ message: 'Successfully updated about.' });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ message: 'Error updating about.' });
//     });
// });



app.patch('/update', (req, res) => {
  let data = JSON.stringify({
    "user_metadata": {
      "about": "Hello"
    }
  });
  
  let config = {
    method: 'patch',
    url: 'https://login.auth0.com/api/v2/users/google-oauth2%7C100737014092563339568',
    headers: { 
      'Content-Type': 'application/json', 
      'Accept': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });


});


app.use(handleErrorServer);
app.use(handleErrorNotFound);



