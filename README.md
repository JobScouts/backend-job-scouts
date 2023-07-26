# JobScouts - v.1.0

**Author Name**: 
* Saif Yahia
* Mohammed Samara
* Mohammed Mustafa
* Aws Al-Omari
* Farah Al-Aydi

## WRRC

Add an image of your WRRC here

## Overview

JobScouts is a comprehensive application designed to assist job seekers in finding suitable employment opportunities and accessing valuable job finding resources. It aims to streamline the job search process and provide a user-friendly platform that maximizes the chances of successful job placements.

## Getting Started

- install  libraries: express, cors, dotenv, pg, axios, bcrypt
- create .env file, refet to .env.sample

## Project Features

- authentication Route 
<pre>
  Mtehod: GET
  Endpoint: '/authRouter'
  Desc: The route that is responsable for **Sign Up** **Login** processes
</pre>
---
-  Job Search Route 
<pre>
  Mtehod: GET
  Endpoint: '/jobSearch'
  Query : { jobTitle  : ' desired Job title';
         CountryLocation:  = 'desired location';
         }
  Desc: Send request to 3rd Party API
</pre>

---
- jobs DataBase Routes :
**myjobs** Table: it is a table related to the jobs saved by the user 
<pre>
  Mtehod: GET
  Endpoint: '/jobs'
  Desc: Get all the data from myjobs table
</pre>
<pre>
  Mtehod: DELETE
  Endpoint: '/jobs/:id'
  Desc: delete a data from myjobs table (id: the id of the record in the table)
</pre>
<pre>
  Mtehod: POST
  Endpoint: '/jobs'
  body : {
    'job_title': 'corresponding value from the api data'
    'employer_name' : 'corresponding value from the api data'
    'employer_logo' : 'corresponding value from the api data'
    'employer_website' : 'corresponding value from the api data'
    'job_highlights' : 'corresponding value from the api data'
    'job_apply_link' : 'corresponding value from the api data'
  }
  Desc: Post the data from api to myjobs table 
</pre>

**users** Table: it is a table to store users information
<pre>
  Mtehod: GET
  Endpoint: 'authRouter/getAllUsers'
  Desc: Get the whole data in users table
</pre>
<pre>
  Mtehod: GET
  Endpoint: 'authRouter/getUser/:id'
  Desc: Get a specific record from users table by params id (id: params represnt the id of the record)
</pre>
<pre>
  Mtehod: DELETE
  Endpoint: 'authRouter/deleteUser/:id'
  Desc: Delete a specific record from users table by params id (id: params represnt the id of the record)
</pre>
"/addUser"
<pre>
  Mtehod: POST
  Endpoint: 'authRouter/addUser'
  body: {
     'full_name':'user entered value'
     'username' : 'user entered value'
    'email' : 'user entered value'
    'password' : 'user entered value'
    'phone' : 'user entered value'
  }
  Desc: Delete a specific record from users table by params id (id: params represnt the id of the record)
</pre>
<pre>
  Mtehod: DELETE
  Endpoint: 'authRouter/deleteUser/:id'
  Desc: Delete a specific record from users table by params id (id: params represnt the id of the record)
</pre>