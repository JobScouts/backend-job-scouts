const pg = require("pg");

const {DB_URL} = require("./config");

const client = new pg.Client('postgres://localhost:5432/jobs');

module.exports = client;