"use strict";
import express from "express";
import mustacheExpress from "mustache-express";
import * as http from "http";
import * as ejs from "ejs";
import bodyParser from "body-parser";
import { task1Router } from "./routes/task1.js";
import { task2Router } from "./routes/task2.js";

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("."));

app.engine('mustache', mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.get("/", (req, res) => {
  res.redirect("/tasks");
});

app.get("/tasks", (req, res) => {
  res.render("index");
});

app.use("/tasks/1", task1Router);
app.use("/tasks/2", task2Router);

const server = http.Server(app);

server.listen(3000, function () {
  console.log("listening on port 3000");
});
