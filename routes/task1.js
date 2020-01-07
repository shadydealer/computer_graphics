import express from "express";
const task1Router = express.Router();

task1Router.get("/",(req, res) => {
  res.render("tasks/1/index");
});

export { task1Router };
