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
  const { userId, about } = req.body; // Assuming you send userId and about in the request body

  const auth0Domain = 'dev-hqpw523nqwilhf7z.us.auth0.com'; // Replace with your Auth0 domain
  const apiUrl = `https://${auth0Domain}/api/v2/users/${userId}`;

  const data = { app_metadata: { about } };
  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkdEakZMOXFWZnNiWFBSZ0Ixanh3YSJ9.eyJpc3MiOiJodHRwczovL2Rldi1ocXB3NTIzbnF3aWxoZjd6LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiIxTFhHaTN5UTVlOHlXdDhKd2paWkU5dzlCUUNBTHcyWUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtaHFwdzUyM25xd2lsaGY3ei51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY5MDMxMjk2MSwiZXhwIjoxNjkwMzk5MzYxLCJhenAiOiIxTFhHaTN5UTVlOHlXdDhKd2paWkU5dzlCUUNBTHcyWSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.SCNtc1KrfIwyZthk9GC3wTNWFBTHnlGx8vgz-r8_idqaaijkBimHNdlNNBthQG6O7YPlVMAge-dKD3Q2XhF0gtMlAQW-mtSJAbLLpEpW-InaMcj48M7JvcFpfJpQXTjpKwc0_U5uHkMHl-THe11-ASyNw825DgBE6oJeeVH46jL0vwkXpSn78xGITYzoRm2cmqzBZ-o26G-PSFnt31IWI3jMv6ulU7SZ4fbFuns53bVnN11s24WKT5VjcsJDSj2X3P5UWn4UMFS_PVs8Q6jTkpD506xL526C3d3pwuvrCUZtYuyYhgnt6zLWfL0zUMCkT4yOD7teQu8xaUhc-24ggA'; // Replace with your Management API Access Token

  const config = {
    method: 'patch',
    url: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data: data,
  };

  axios(config)
    .then((response) => {
      console.log('User about updated successfully:', response.data);
      res.status(200).json({ message: 'User about updated successfully.' });
    })
    .catch((error) => {
      console.error('Error updating user about:', error.response.data);
      res.status(500).json({ error: 'Error updating user about.' });
    });
});


app.use(handleErrorServer);
app.use(handleErrorNotFound);



