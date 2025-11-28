import AppError from "../error";
class TasksApi {
    apiUrl;
    constructor(apiUrl = "http://localhost:3000/tasks") {
        this.apiUrl = apiUrl;
    }
    fetchAllTasks = async () => {
        const response = await fetch(this.apiUrl, {});
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    };
    createTaskData = async (userData) => {
        const response = await fetch(this.apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    };
    findTaskById = async (id) => {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Task with id ${id} not found (status: ${response.status})`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error(new Error(`Find user is error: ${error}`));
            return null;
        }
    };
    deleteTaskById = async (id) => {
        try {
            const task = await this.findTaskById(id);
            if (!task) {
                throw new AppError("Task not found", 404);
            }
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to delete task with id ${id} (status: ${response.status})`);
            }
            return true;
        }
        catch (error) {
            console.error(new Error(`Created task is error: ${error}`));
            return false;
        }
    };
}
export const taskApi = new TasksApi();
//# sourceMappingURL=tasksApi.js.map