const settings = require("./settings"); // settings.json
const pg = require("pg");

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

let fName = process.argv[2];
let lName = process.argv[3];
let bday = process.argv[4];

console.log(fName, " ||| ", lName, " ||| ", bday);


knex('famous_people').insert({
  first_name: fName,
  last_name: lName,
  birthdate: bday
}).then(function(result) {
  console.log(result);
});

knex.destroy();
