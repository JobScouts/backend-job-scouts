'use strict';
const express = require("express");
const client = require("../clinet");
const Router = express.Router();

Router.get("/getAllUsers", (req, res, next) => {
  try {
    let sql = `select * from users`;
    client.query(sql).then((user) => {
      res.status(200).send(user.rows);
    });
  } catch (e) {
    next(`Error From getAllUsers : ${e}`);
  }
});

Router.get("/getUser/:id" , (req , res, next)=>{
  try {
    let {id} = req.params;
    let sql = `select * from users where id=${id}`;
    client.query(sql).then((user)=>{
    res.status(200).send(user.rows);
    })
  } catch (error) {
    next(`Error From getUser:/id : ${e}`);  
  }  
  });

Router.post("/addUser", (req, res, next) => {
  try {
    let full_name = req.body.full_name;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;

    let sql = `insert into users(full_name,username,email,password,phone) values($1,$2,$3,$4,$5)`;
    client.query(sql, [full_name, username, email, password, phone]).then(() => {
      res.status(201).send(`user ${full_name} added sucss`);
    })
  } catch (error) {
    next(`Error From addUser : ${e}`);
  }
});
module.exports = Router;