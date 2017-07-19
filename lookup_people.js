const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let input = process.argv.slice(2);

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  console.log("Searching.......");

  let sql = "SELECT * FROM famous_people WHERE last_name=$1::text OR first_name=$1::text";

  client.query(sql, input, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    console.log(`Found ${result.rows.length} person(s) by the name '${input}':`);
    console.log(`-${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born ${result.rows[0].birthdate}`);

    client.end();
  });
});