const express = require('express');
const router = express.Router();

const db = require("../db");

router.get('/', function (request, response) {
  var sql = 'SELECT * FROM score';
  var mydata = [];
  db.query(sql, (err, rows) => {
    if (err) {
      response.json({ err: "Failed to connect" })
    }
    else {
      for (let em of rows) {
        console.log(em);
        let record = [em['username'], em['checktime'], em['score'], em['timer']];
        mydata.push(record);
      }
      console.log(mydata);
      response.writeHead(200, {
        "Content-Type": "application/json"
      });
      response.write(JSON.stringify(mydata));
      response.end();
    };
  });
});

module.exports = router;