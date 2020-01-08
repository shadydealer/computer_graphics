"use strict";
import express from "express";
import mustacheExpress from "mustache-express";
import * as http from "http";
import * as ejs from "ejs";
import bodyParser from "body-parser";
import { tasksRouter } from "./routes/tasks.js";

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

app.use("/tasks/", tasksRouter);

const server = http.Server(app);

server.listen(3000, function () {
  console.log("listening on port 3000");
});
