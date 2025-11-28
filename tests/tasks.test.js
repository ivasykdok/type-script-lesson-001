import db from "../src/config/database";
import app from "../src/App";
import request from "supertest";
let taskId;
beforeAll(async () => {
    await db.sync({ force: true });
    const response = await request(app)
        .post("/tasks")
        .send({
        title: "Initial Task",
        description: "Test task description",
        priority: "medium",
        status: "todo",
    });
    taskId = response.body.id;
});
afterAll(async () => {
    await db.close();
});
describe("Tasks API", () => {
    it("POST /tasks - success", async () => {
        const response = await request(app)
            .post("/tasks")
            .send({
            title: "New Task",
            description: "New task description",
            priority: "high",
            status: "in-progress",
        })
            .expect(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.title).toBe("New Task");
        expect(response.body.description).toBe("New task description");
        expect(response.body.priority).toBe("high");
        expect(response.body.status).toBe("in-progress");
    });
    it("GET /tasks - should return all tasks", async () => {
        const response = await request(app).get("/tasks").expect(200);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("title");
        expect(response.body[0]).toHaveProperty("priority");
        expect(response.body[0]).toHaveProperty("status");
    });
    it("GET /tasks/:id - should return task by ID", async () => {
        const response = await request(app).get(`/tasks/${taskId}`).expect(200);
        expect(response.body).toHaveProperty("id", taskId);
        expect(response.body.title).toBe("Initial Task");
        expect(response.body.priority).toBe("medium");
        expect(response.body.status).toBe("todo");
    });
    it("GET /tasks/:id - should return 404 if task not found", async () => {
        const response = await request(app).get(`/tasks/9999`).expect(404);
        expect(response.body).toHaveProperty("message", "Task not found");
    });
    it("PUT /tasks/:id - should update task by ID", async () => {
        const response = await request(app)
            .put(`/tasks/${taskId}`)
            .send({ title: "Updated Task" })
            .expect(200);
        expect(response.body).toHaveProperty("id", taskId);
        expect(response.body.title).toBe("Updated Task");
    });
    it("DELETE /tasks/:id - should delete task by ID", async () => {
        const response = await request(app).delete(`/tasks/${taskId}`).expect(200);
        expect(response.body).toHaveProperty("message", "Task successfully deleted");
        expect(response.body.result).toBe(true);
        await request(app).get(`/tasks/${taskId}`).expect(404);
    });
    it("DELETE /tasks/:id - should return 404 if task not found", async () => {
        const response = await request(app).delete(`/tasks/9999`).expect(404);
        expect(response.body).toHaveProperty("message", "Task not found");
    });
});
//# sourceMappingURL=tasks.test.js.map