"use strict";
const express = require('express');
const cors = require('cors');
const axios = require("axios");
require("dotenv").config();
const {PORT} = require("./config");
const authRouter = require("./routes/auth.routes");
const handleErrorServer = require("./error_handlers/500");
const handleErrorNotFound = require("./error_handlers/404");
const client = require("./clinet");


const app = express();
app.use(cors());
app.use(express.json()); 

app.get("/" , (req ,res , next) => {
    try {
    // let jobTitle  = req.query.query;
      res.send("Welcome to Home Page");
    } catch (e) {
      next(`handleFavorite Error : ${e}`);
    }
});


/////// 
app.use(authRouter);


/////// Route to get all jobs from 3-party-API
app.get("/jobSearch" , async (req ,res , next) => {
    try {
        let jobTitle  = req.query.jobTitle;
        let page  = req.query.page;
        let num_pages  = req.query.num_pages;

        const options = {
            method: 'GET',
            url: 'https://jsearch.p.rapidapi.com/search',
            params: {
              query: jobTitle,
              page: page,
              num_pages: num_pages
            },
            headers: {
              'X-RapidAPI-Key': process.env.SECRET_API,
              'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
          };
        let axiosResponse = await axios.request(options);
        let allJob = axiosResponse.data.data;

        let jobs = allJob.map((result)=>({
            "employer_name" : result.employer_name,
            "employer_logo": result.employer_logo,
            "employer_website": result.employer_website,            
            "job_employment_type": result.job_employment_type,
            // "job_publisher":result.job_publisher,
            "job_title": result.job_title,
            "job_description": result.job_description,
            "job_is_remote" : result.job_is_remote,
            "job_city": result.job_city,
            "job_country" : result.job_country,  
            "job_google_link": result.job_google_link,
            "job_apply_link": result.job_apply_link,
            "job_highlights" : result.job_highlights.Qualifications,
            "job_title": result.job_title,
            "job_min_salary": result.job_min_salary,
            "job_max_salary": result.job_max_salary,
            
        }));
// hell
        res.send(jobs);
    } catch (error) {
        console.error(error);
    }
});


/////////// Handle Error Routes

app.use(handleErrorServer);
app.use(handleErrorNotFound);


client.connect().then(()=>{
    app.listen(PORT , ()=>{
    console.log(`Running at ${PORT} Port`);
        });
  });
