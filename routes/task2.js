import express from "express";
const task2Router = express.Router();

task2Router.get("/",(req, res) => {
  res.render("tasks/2/index");
});

export { task2Router };
