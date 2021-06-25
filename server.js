const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});
connection.connect();

const multer = require("multer");
const upload = multer({ dest: "./upload" });

app.get("/api/customers", (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.use("/image", express.static("./upload"));

app.post("/api/customers", upload.single("image"), (req, res) => {
  let name = req.body.name;
  let password = req.body.password;
  let gender = req.body.gender;
  let job = req.body.job;
  if (req.body.fileCheck == "1") {
    console.log("파일 있는 회원 등록");
    let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, 0, now())";
    let image = "/image/" + req.file.filename;
    let params = [image, name, password, gender, job];
    connection.query(sql, params, (err, rows, fields) => {
      console.log(params);
      res.send(rows);
      console.log(err);
      console.log(rows);
    });
  } else {
    console.log("파일 없는 회원 등록");
    let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, 0, now())";
    let image = "/image/dafaultUser";
    let params = [image, name, password, gender, job];
    connection.query(sql, params, (err, rows, fields) => {
      console.log(params);
      res.send(rows);
      console.log(err);
      console.log(rows);
    });
  }
});

app.delete("/api/customers/:id", (req, res) => {
  console.log([req.params.id], "번 고객 정보를 삭제하였습니다.");
  let sql = "UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
    console.log(rows);
  });
});

app.put("/api/customers/:id", upload.single("image"), (req, res) => {
  console.log("PUT을 시작합니다.");
  console.log(req.params.id + "번 고객 정보를 수정합니다.");
  let name = req.body.name;
  let password = req.body.password;
  let job = req.body.job;
  let gender = req.body.gender;
  //사진파일 추가
  if (req.body.fileCheck == "1") {
    console.log("파일있습네다");
    let sql =
      "UPDATE CUSTOMER SET image = ?, name = ?, job = ?, gender = ?, password = ? WHERE id = ?";
    let image = "/image/" + req.file.filename;
    let params = [image, name, job, gender, password, req.params.id];
    connection.query(sql, params, (err, rows, fields) => {
      res.send(rows);
      console.log(err);
      console.log(rows);
      console.log(params);
    });
    //사진파일 없을 때
  } else if (req.body.fileCheck == "0") {
    console.log("파일없습네다");
    let sql =
      "UPDATE CUSTOMER SET name = ?, job = ?, gender = ?, password = ? WHERE id = ?";
    let params = [name, job, gender, password, req.params.id];
    connection.query(sql, params, (err, rows, fields) => {
      res.send(rows);
      console.log(err);
      console.log(rows);
      console.log(params);
    });
  } else if (req.body.fileCheck == "2") {
    console.log("기본사진으로 변경");
    let sql =
      "UPDATE CUSTOMER SET image = ?, name = ?, job = ?, gender = ?, password = ? WHERE id = ?";
    let image = "/image/dafaultUser";
    let params = [image, name, job, gender, password, req.params.id];
    connection.query(sql, params, (err, rows, fields) => {
      res.send(rows);
      console.log(err);
      console.log(rows);
      console.log(params);
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
