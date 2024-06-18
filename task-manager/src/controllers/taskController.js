"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskById = exports.updateTaskById = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = new Task_1.default(req.body);
    yield task.save();
    res.status(201).send(task);
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, dueDate, page = 1, limit = 10, sortBy = "title", order = "asc", } = req.query;
    const query = {};
    if (status)
        query.status = status;
    if (dueDate)
        query.dueDate = { $lte: new Date(dueDate) };
    const tasks = yield Task_1.default.find(query)
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));
    res.send(tasks);
});
exports.getTasks = getTasks;
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Task_1.default.findById(req.params.id);
    if (!task)
        return res.status(404).send({ error: "Task not found" });
    res.send(task);
});
exports.getTaskById = getTaskById;
const updateTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Task_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!task)
        return res.status(404).send({ error: "Task not found" });
    res.send(task);
});
exports.updateTaskById = updateTaskById;
const deleteTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Task_1.default.findByIdAndDelete(req.params.id);
    if (!task)
        return res.status(404).send({ error: "Task not found" });
    res.send(task);
});
exports.deleteTaskById = deleteTaskById;
