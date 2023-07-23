'use strict';
const express = require("express");
const client = require("../clinet");
const Router = express.Router();
const bcrypt = require('bcrypt');

/////////// Functions 

// Function to generate a random verification token
function generateVerificationToken(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }
  return token;
}

// Function to send the verification email
// async function sendVerificationEmail(email, verificationToken) {
//   // Create a nodemailer transporter with your email service provider settings
//   let transporter = nodemailer.createTransport({
//     service: 'gmail', // e.g., 'gmail'
//     auth: {
//       user: 'mohamadsami1211@gmail.com',
//       pass: 'mohamadsamara1999'
//     }
//   });

//   // Create the email content
//   let mailOptions = {
//     from: 'mohamadsami1211@gmail.com',
//     to: email,
//     subject: 'Email Verification',
//     text: `Hello,\n\nThank you for registering on our platform. Please click the link below to verify your email:\n\nhttp://your_verification_link/${verificationToken}\n\nBest regards,\nYour App Team`
//   };

//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// }


// Function to update the email_verified status in the database
async function markEmailAsVerified(userId) {
  try {
    const sql = `UPDATE users SET email_verified = true, verification_token = NULL WHERE id = $1`;
    await client.query(sql, [userId]);
  } catch (error) {
    throw error;
  }
}

// Function to compare the password entered by the user with the hashed password stored in the database
async function comparePasswords(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

/////////// End Functions


/////////////  Route to get All User
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


/////// Route to get User by id
Router.get("/getUser/:id", (req, res, next) => {
  try {
    let { id } = req.params;
    let sql = `select * from users where id=${id}`;
    client.query(sql).then((user) => {
      res.status(200).send(user.rows);
    })
  } catch (error) {

    next(`Error From getUser:/id : ${e}`);  
  }  
  });
  ///////// Route for delete User 
Router.delete("/deleteUser/:id" , (req , res, next)=>{
  try {
    let {id} = req.params;
    let sql = `delete from users where id=${id}`;
    client.query(sql).then(()=>{
    res.status(200).send("deleted successfully");
    }) 
  } catch (error) {
    next(`Error From deleteUser/:id : ${e}`);  
  }
  });



//////// // Route to Add User
Router.post("/addUser", async (req, res, next) => {
  try {
    let full_name = req.body.full_name;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;

    // Generate a salt and hash the provided password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Generate a verification token (you can use any method to generate a unique token)
    const verificationToken = generateVerificationToken(20);
    // Store the verification token and email_verified status in the database
    const sql = `INSERT INTO users (full_name, username, email, password, phone, verification_token, email_verified) VALUES ($1, $2, $3, $4, $5, $6, false)`;
    await client.query(sql, [full_name, username, email, hashedPassword, phone, verificationToken]);
    // Send the verification email
    // sendVerificationEmail(email, verificationToken);
    res.status(201).send(`User ${full_name} added successfully. Verification email sent.`);
  } catch (error) {
    next(`Error from addUser: ${error}`);
  }
});

/////////////// Route to handle email verification
Router.get("/verifyEmail/:verificationToken", async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    // Find the user in the database based on the verification token
    const sql = `SELECT * FROM users WHERE verification_token = $1`;
    const result = await client.query(sql, [verificationToken]);
    if (result.rows.length === 0) {
      // User not found or verification token invalid
      return res.status(404).send('Invalid verification token.');
    }
    // Mark the user's email as verified in the database
    const userId = result.rows[0].id;
    await markEmailAsVerified(userId);
    res.status(200).send('Email verification successful.');
  } catch (error) {
    next(`Error from verifyEmail: ${error}`);
  }
});

/////////// Route for user login, where you will check the username and password against the database
Router.post("/login", async (req, res, next) => {
  try {
    let { email, password } = req.body;
    // Find the user in the database based on the provided email
    let sql = `SELECT * FROM users WHERE email = $1`;
    const result = await client.query(sql, [email]);
    if (result.rows.length === 0) {
      // User not found
      return res.status(401).send('Invalid email or password.');
    }
    const foundUser = result.rows[0];
    const isPasswordCorrect = await comparePasswords(password, foundUser.password);
    if (!isPasswordCorrect) {
      // Password doesn't match
      return res.status(401).send('Invalid email or password.');
    }
    // Password is correct, user is authenticated
    res.status(200).send('Login successful.');

  } catch (error) {
    next(`Error From login: ${error}`);
  }
});


///////// Route for delete User 
Router.delete("/deleteUser/:id", (req, res, next) => {
  try {
    let { id } = req.params;
    let sql = `delete from users where id=${id}`;
    client.query(sql).then(() => {
      res.status(200).send("deleted successfully");
    })
  } catch (error) {
    next(`Error From deleteUser/:id : ${e}`);
  }
});

Router.put("/updateProfile/:id", (req, res, next) => {
  try {
    let { id } = req.params;
    let { full_name, username, email, password, phone } = req.body;
    let sql = `UPDATE users SET full_name=$1,username=$2,email=$3,password=$4,phone=$5 where id=${id}`;
    client.query(sql, [full_name, username, email, password, phone]).then(() => {
      res.status(200).send("updated successfully");
    })
  } catch (error) {
    next(`Error From UPDATE/:id : ${e}`);
  }
});

{
  /*
  "employer_name" : result.employer_name,
  "employer_logo": result.employer_logo,
  "employer_website": result.employer_website, 
  "job_city": result.job_city,
  "job_country" : result.job_country,  
  "job_google_link": result.job_google_link,
  "job_apply_link": result.job_apply_link,
  "job_highlights" : result.job_highlights.Qualifications,
  "job_title": result.job_title,
  "job_min_salary": result.job_min_salary,
  "job_max_salary": result.job_max_salary,
  */
}

module.exports = Router;