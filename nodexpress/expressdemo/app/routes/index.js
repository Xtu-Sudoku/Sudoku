const express = require('express');
const router = express.Router();

const db = require("../db");

var id = 1;

router.get('/', function (request, response) {
  var sql = 'SELECT * FROM score';
  var mydata = [];
  db.query(sql,[], (err, rows) => {
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

  db.query('SELECT count(*) FROM score', [], (err, rows) => {
    if (err) {
      response.json({ err: "Failed to connect" })
    } else {
      for (let em of rows) {
        id = em['count(*)'] + 1;
      }
      console.log("id:", id);
      console.log(typeof id);
    }
  });

});

module.exports = router;

const app = express();
app.use(express.static(__dirname));

app.get('/add', function (req, res) {
  var response = {
    "upload_name": req.query.upload_name,
    "upload_time": req.query.upload_time,
    "upload_score": req.query.upload_score,
    "upload_checktime": req.query.upload_checktime
  };

  console.log("upload_name:",req.query.upload_name);

  if(response.upload_name == 0){
    res.send('name should be not null!');
    return ;
  }else{
    var addsql = 'INSERT INTO score(username,timer,checktime,score,id) VALUES(?,?,?,?,?)';
    var addsqlparams = [response.upload_name, response.upload_time, response.upload_checktime, response.upload_score, id];
    db.query(addsql, addsqlparams, function (err, result) {
      if (err) {
        console.log('[INSERT ERROR]-');
        res.send('insert error');
        return;
      }
      res.send('submit successfully');
      res.end();
    })
  }
})

var server = app.listen(3001, function () {
  var port = server.address().port
  console.log("访问端口%s", port);
})