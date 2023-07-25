'use strict';
const { Router } = require("express");
const router = Router();
const client = require("../clinet");

/// Un-use For Now
router.get("/", async (req, res, next) => {
  try {
    let sql = 'SELECT * FROM myjobs'
    let jobinfo = await client.query(sql)
    res.status(200).send(jobinfo.rows)
  }
  catch (error) {
    next(`ERROR From getjob: ${error}`)
  }
})

/// Route To Add Job To MyProfile
router.post("/", async (req, res, next) => {
  try {
    let { job_title, employer_name, employer_logo, employer_website, job_highlights, job_apply_link, sub } = req.body;
    let sql = 'insert into myjobs (job_title,employer_name,employer_logo,employer_website,job_highlights,job_apply_link,sub) values($1,$2,$3,$4,$5,$6,$7)';
    await client.query(sql, [job_title, employer_name, employer_logo, employer_website, job_highlights, job_apply_link, sub]).then(() => {
      res.status(201).send(`job ${job_title} added to myjobs table`);
    })

  } catch (error) {
    next(`Error From addJob : ${error}`);
  }
});

/// Route To Delete Saved Job From MyProfile
router.delete("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let getsql = 'SELECT * FROM myjobs';
    let deletesql = `DELETE FROM myjobs WHERE id=${id} `;
    let jobinfo = await client.query(getsql);
    if (jobinfo.rows.length > 0) {
      await client.query(deletesql);
      res.status(204).end();
    } else {
      res.status(404).send("id does not exist");
    }
  } catch (error) {
    next(`error in delete job by id: ${error}`);
  }
});


// Router.put("/UPDATE/:id" , (req , res, next)=>{
//   try {
//       let {id} = req.params;
//       let {about}=req.body;
//       let sql = `UPDATE myjobs SET about=$1 where id=${id}`; 
//       client.query(sql , [about]).then(()=>{
//       res.status(200).send("updated successfully");
//   }) 
//   } catch (error) {
//     next(`Error From UPDATE/:id : ${e}`);
//   }
//   });


/// Route To Update About From MyProfile

// Route handler for the /update path
router.patch('/update', (req, res) => {
  let { about } = req.body;
  let data = JSON.stringify({
    app_metadata: { about },
  });

  let config = {
    method: 'patch',
    url: 'https://login.auth0.com/api/v2/users/google-oauth2%7C100737014092563339568',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.status(200).json({ message: 'Successfully updated about.' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error updating about.' });
    });
});

module.exports = router

// const axios = require('axios');
// let data = JSON.stringify({
//   "blocked": false,
//   "email_verified": false,
//   "email": "string",
//   "phone_number": "string",
//   "phone_verified": false,
//   "user_metadata": {},
//   "app_metadata": {},
//   "given_name": "string",
//   "family_name": "string",
//   "name": "string",
//   "nickname": "string",
//   "picture": "string",
//   "verify_email": false,
//   "verify_phone_number": false,
//   "password": "string",
//   "connection": "string",
//   "client_id": "string",
//   "username": "string"
// });

// let config = {
//   method: 'patch',
//   url: 'https://login.auth0.com/api/v2/users/google-oauth2%7C100737014092563339568',
//   headers: { 
//     'Content-Type': 'application/json', 
//     'Accept': 'application/json'
//   },
//   data : data
// };

// axios(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });
