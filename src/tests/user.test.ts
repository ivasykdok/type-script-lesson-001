import db from "../config/database.js";
import { User } from "../models/user.model.js";
import request from "supertest";
import app from "../app.js";
import { beforeEach } from "node:test";

beforeEach(async () => {
  await db.sync({ force: true });
});

afterAll(async () => {
  await db.close();
});

it("POST /users - success", async () => {
  const response = await request(app)
    .post("/users")
    .send({ username: "John Dou", email: "john@example.com" })
    .expect(201);

  expect(response.body).toHaveProperty("id");
  expect(response.body.username).toBe("John Dou");
  expect(response.body.email).toBe("");
});

/*
it("POST /users - validation error", async () => {
  const response = await request(app)
    .post("/users")
    .send({ username: "", email: "" })
    .expect(200);

  expect(response.body).toHaveProperty("error");
});*/
