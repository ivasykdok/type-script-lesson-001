import { addTask, deleteTaskData, fetchTaskById, getAllTasks, updateTaskData, } from "../service/task.service";
export const getTasks = async (req, res, next) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error("getTasks error:", error);
        next(error);
    }
};
export const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newTask = await addTask(req.body);
        res.status(201).json(newTask);
    }
    catch (error) {
        console.error("Create new task is error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const findTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await fetchTaskById(Number(id));
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteTaskData(Number(id));
        if (!result) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json({
            message: "Task successfully deleted",
            result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await updateTaskData(Number(id), req.body);
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
//# sourceMappingURL=task.controller.js.map