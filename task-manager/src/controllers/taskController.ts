import { Request, Response } from "express";
import Task, { ITask } from "../models/Task";

export const createTask = async (req: Request, res: Response) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).send(task);
};

export const getTasks = async (req: Request, res: Response) => {
  const {
    status,
    dueDate,
    page = 1,
    limit = 10,
    sortBy = "title",
    order = "asc",
  } = req.query;

  const query: any = {};
  if (status) query.status = status;
  if (dueDate) query.dueDate = { $lte: new Date(dueDate as string) };

  const tasks = await Task.find(query)
    .sort({ [sortBy as string]: order === "asc" ? 1 : -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  res.send(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).send({ error: "Task not found" });
  res.send(task);
};

export const updateTaskById = async (req: Request, res: Response) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) return res.status(404).send({ error: "Task not found" });
  res.send(task);
};

export const deleteTaskById = async (req: Request, res: Response) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).send({ error: "Task not found" });
  res.send(task);
};
