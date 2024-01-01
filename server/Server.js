const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const http = require("http");

const app = express();

const server = http.createServer(app);
app.use(cors({ origin: true }));
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://0.0.0.0:27017/JustForYou")
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch(() => {
    console.log("Error in Database Connectivity");
  });

var user = require("./Schema.js");

app.post("/", async (req, res, next) => {
//   console.log(req.body);
  const data = new user({
    email: req.body.email,
  });

  try {
    const result = await data.save();
    console.log(result);
    res.send({ user: true, data: result });
  } catch (e) {
    res.send({ user: false });
  }
});

app.get("/", async (req, res, next) => {
 res.send("Hii");
});

app.listen(5000, () => {
  console.log(`Server is running on 5000`);
});
