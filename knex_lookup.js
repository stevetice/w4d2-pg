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
console.log(`Searching...`);

let input = process.argv[2];
console.log(input);

knex.select().from('famous_people')
.where('last_name', input)
.orWhere('first_name', input)
.asCallback(function(err, rows) {
  if (err) {
    return console.error(err);
  } else {
    // console.log(rows);
    console.log(`-${rows[0].id}: ${rows[0].first_name} ${rows[0].last_name}, born ${rows[0].birthdate}`);
  }
});
knex.destroy();