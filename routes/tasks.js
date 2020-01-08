import express from "express";
const tasksRouter = express.Router();

tasksRouter.get("/", (req, res) => {
  res.render("tasks/index");
});

tasksRouter.get("/:id/",(req, res) => {
  const taskId = req.params.id;
  res.render(`tasks/${taskId}/index`);
});

export { tasksRouter };
