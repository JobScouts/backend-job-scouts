// 'use strict';
// const { Router } = require("express");
// const router = Router();
// const client = require("../clinet");

// /// Un-use For Now
// router.get("/", async (req, res, next) => {
//   try {
//     let sql = 'SELECT * FROM myjobs'
//     let jobinfo = await client.query(sql)
//     res.status(200).send(jobinfo.rows)
//   }
//   catch (error) {
//     next(`ERROR From getjob: ${error}`)
//   }
// })

// /// Route To Add Job To MyProfile
// router.post("/", async (req, res, next) => {
//   try {
//     let { job_title, employer_name, employer_logo, employer_website, job_highlights, job_apply_link, sub } = req.body;
//     let sql = 'insert into myjobs (job_title,employer_name,employer_logo,employer_website,job_highlights,job_apply_link,sub) values($1,$2,$3,$4,$5,$6,$7)';
//     await client.query(sql, [job_title, employer_name, employer_logo, employer_website, job_highlights, job_apply_link, sub]).then(() => {
//       res.status(201).send(`job ${job_title} added to myjobs table`);
//     })

//   } catch (error) {
//     next(`Error From addJob : ${error}`);
//   }
// });
const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { SECRET_API } = require('../config');

const BASE_URL = 'https://jsearch.p.rapidapi.com/search';

router.get("/", async (req, res, next) => {
  try {
    const { jobTitle, country } = req.query;

    const options = {
      method: 'GET',
      url: BASE_URL,
      params: {
        query: `${jobTitle} in ${country}`,
        page: '1',
        num_pages: '1',
      },
      headers: {
        'X-RapidAPI-Key': SECRET_API,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    const jobsData = response.data.data;

    const jobs = jobsData.map((result) => ({
      employer_name: result.employer_name,
      employer_logo: result.employer_logo || "",
      employer_website: result.employer_website || "",
      job_employment_type: result.job_employment_type,
      job_title: result.job_title,
      job_description: result.job_description,
      job_is_remote: result.job_is_remote,
      job_city: result.job_city,
      job_country: result.job_country,
      job_google_link: result.job_google_link,
      job_apply_link: result.job_apply_link,
      job_highlights: result.job_highlights && result.job_highlights.Qualifications
        ? result.job_highlights.Qualifications.join(' * ')
        : "",
      job_min_salary: result.job_min_salary,
      job_max_salary: result.job_max_salary,
    }));

    res.send(jobs);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

// /// Route To Delete Saved Job From MyProfile
// router.delete("/:id", async (req, res, next) => {
//   try {
//     let id = req.params.id;
//     let getsql = 'SELECT * FROM myjobs';
//     let deletesql = `DELETE FROM myjobs WHERE id=${id} `;
//     let jobinfo = await client.query(getsql);
//     if (jobinfo.rows.length > 0) {
//       await client.query(deletesql);
//       res.status(204).end();
//     } else {
//       res.status(404).send("id does not exist");
//     }
//   } catch (error) {
//     next(`error in delete job by id: ${error}`);
//   }
// });
// module.exports = router