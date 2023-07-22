'use strict';
const express = require("express");
const client = require("../clinet");
const Router = express.Router();
const bcrypt = require('bcrypt');

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

Router.post("/addUser", async (req, res, next) => {
  try {
    let full_name = req.body.full_name;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;

     // Generate a salt and hash the provided password
     const saltRounds = 10; // The number of salt rounds used in hashing
     const hashedPassword = await bcrypt.hash(password, saltRounds);

    let sql = `insert into users(full_name,username,email,password,phone) values($1,$2,$3,$4,$5)`;
    await client.query(sql, [full_name, username, email, hashedPassword, phone]).then(() => {
      res.status(201).send(`user ${full_name} added sucss`);
    })
  } catch (error) {
    next(`Error From addUser : ${e}`);
  }
});

// Function to compare the password entered by the user with the hashed password stored in the database
async function comparePasswords(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Route for user login, where you will check the username and password against the database
Router.post("/login", async (req, res, next) => {
  try {
    let { username, password } = req.body;

    // Find the user in the database based on the provided username
    let sql = `SELECT * FROM users WHERE username = $1`;
    const result = await client.query(sql, [username]);

    if (result.rows.length === 0) {
      // User not found
      return res.status(401).send('User not found');
    }

    const foundUser = result.rows[0];
    const isPasswordCorrect = await comparePasswords(password, foundUser.password);

    if (!isPasswordCorrect) {
      // Password doesn't match
      return res.status(401).send('Password does not match');
    }

    // Password is correct, user is authenticated
    res.status(200).send('Login successful.');

  } catch (error) {
    next(`Error From login : ${error}`);
  }
});


module.exports = Router;