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

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching.......");

  let name = process.argv.slice(2);
  let query = `SELECT * FROM famous_people WHERE last_name=name OR first_name=input`;

  client.query(query, ["input"], err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[0].number);
    // console.log("Found ", X "person(s) by the name ", name, ":");
    return result
    client.end();
  });
});