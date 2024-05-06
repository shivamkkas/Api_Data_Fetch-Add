const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const db = require("./connection")

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

app.get("/:user_id", (req, res) => {
  const id = req.params.user_id;
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (results.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.json(results[0]);
    }
  });
});

app.post("/", (req, res) => {
  // to fetch post data we need to retrive it from the body
  const { name, age } = req.body; // this is different

  const sql = "INSERT INTO users (name, age) VALUES (?, ?)";
  db.query(sql, [name, age], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving user");
    }
    res.status(201).send("User created successfully"); // 201 is the status code for created
  });
});

app.listen(port, () => {
  console.log("Server is running...");
});
