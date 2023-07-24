'use strict';
const {Router} = require("express");
const router = Router();
const client = require("../clinet");


router.get("/", async(req,res,next)=>{
    try{
        let sql='SELECT * FROM myjobs'
        let jobinfo= await client.query(sql)
          res.status(200).send(jobinfo.rows)}
          catch(error){
            next(`ERROR From getjob: ${error}`)
          }
})

router.post("/", async (req, res, next) => {
    try {
      //let id = req.params.id;

       let {job_title, employer_name, employer_logo, employer_website, job_highlights,job_apply_link,sub } = req.body;
      //let sql=`SELECT * FROM myjobs WHERE job_title = ${job_title} AND employer_name = ${employer_name}`;
      //let jobinfo= await client.query(sql);
      /*if(jobinfo.rows.length>0){
        res.send('job already in data base')
      }*/
     // else{
      let sql = 'insert into myjobs (job_title,employer_name,employer_logo,employer_website,job_highlights,job_apply_link,sub) values($1,$2,$3,$4,$5,$6,$7)';
      await client.query(sql, [job_title,employer_name,employer_logo, employer_website, job_highlights,job_apply_link,sub ]).then(() => {
        res.status(201).send(`job ${job_title} added to myjobs table`);
//user id:${user_id} connect with job id:${job_id} in table user_jobs
        // let sql = `insert into user_jobs (user_id, job_id) values($1,$2)`;
      // await client.query(sql, [user_id, job_id]).then(() => {
      //   res.status(201).send(`user id:${user_id} connected with job id:${job_id} in table user_jobs`);
        })
      //}
    } catch (error) {
      next(`Error From addJob : ${error}`);
    }
  });

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