'use strict';
const {Router} = require("express");
const router = Router();
const client = require("../clinet");


/// Route to get data for 1 user
router.get("/", async(req,res,next)=>{
    try{
      const { sub }= req.query;
        let sql=`SELECT * FROM myjobs WHERE sub = $1`
        let jobinfo= await client.query(sql,[sub])
          res.status(200).send(jobinfo.rows)
        }
          catch(error){
            next(`ERROR From getjob: ${error}`)
          }
})



// Route to get data for all user
router.get("/allSavedJob", async(req,res,next)=>{
  try{
      let sql=`SELECT * FROM myjobs`
      let jobinfo= await client.query(sql)
        res.status(200).send(jobinfo.rows)
      }
        catch(error){
          next(`ERROR From getjob: ${error}`)
        }
})


// Route to Save new Job to profile 
router.post("/", async (req, res, next) => {
    try {

       let {job_title, employer_name, employer_logo, employer_website, job_highlights,job_apply_link,sub,job_city,job_country,job_id,job_posted_at_datetime_utc } = req.body;
      let sql = 'insert into myjobs (job_title,employer_name,employer_logo,employer_website,job_highlights,job_apply_link,sub,job_city,job_country,job_id,job_posted_at_datetime_utc) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)';
      await client.query(sql, [job_title,employer_name,employer_logo, employer_website, job_highlights,job_apply_link,sub,job_city,job_country,job_id,job_posted_at_datetime_utc ]).then(() => {
        res.status(201).send(`job ${job_title} added to myjobs table`);
        })
    } catch (error) {
      next(`Error From addJob : ${error}`);
    }
  });

  // Route to UnSave an Job
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
  

  module.exports=router