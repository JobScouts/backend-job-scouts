const { Router } = require("express");
const axios = require("axios");
const router = Router();
const {SECRET_API}=require('../config')


/////// Route to get all jobs from 3-party-API
router.get("/" , async (req ,res , next) => {
    try {
        let jobTitle  = req.query.jobTitle;
        let country  = req.query.country;
  const options = {
    method: 'GET',
    url: 'https://jsearch.p.rapidapi.com/search',
    params: {
    query: `${jobTitle} in ${country}`,
    page: '1',
    num_pages: '1'
  },
  headers: {
    'X-RapidAPI-Key': SECRET_API,
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
  }
};
        let axiosResponse = await axios.request(options);
        let allJob = axiosResponse.data.data;

        let jobs = allJob.map((result)=>({
            "employer_name" : result.employer_name,
            "employer_logo": result.employer_logo?result.employer_logo:"",
            "employer_website": result.employer_website?result.employer_website :"" ,            
            "job_employment_type": result.job_employment_type?result.job_employment_type:"",
            "job_title": result.job_title?result.job_title:"",
            "job_description": result.job_description?result.job_description:"",
            "job_is_remote" : result.job_is_remote?result.job_is_remote:"",
            "job_city": result.job_city?result.job_city:"",
            "job_country" : result.job_country?result.job_country:"",
            "job_google_link": result.job_google_link?result.job_google_link:"",
            "job_apply_link": result.job_apply_link?result.job_apply_link:"",
            "job_highlights": result.job_highlights && result.job_highlights.Qualifications ? result.job_highlights.Qualifications.join(' * ') : "",          
            "job_min_salary": result.job_min_salary?result.job_min_salary:"",
            "job_max_salary": result.job_max_salary?result.job_max_salary:"",
            "job_id": result.job_id?result.job_id:"",
            "job_posted_at_datetime_utc":result.job_posted_at_datetime_utc?result.job_posted_at_datetime_utc:""
        }));
        
        res.send(jobs);
    } catch (error) {
        console.error(error);
    }
});
module.exports=router;