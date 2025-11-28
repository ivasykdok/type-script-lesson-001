import db from "../src/config/database";
import serverApp from "../src/serverApp";
import request from "supertest";

let romanId: string;

beforeAll(async () => {
  await db.sync({ force: true });

  const response1 = await request(serverApp)
    .post("/users")
    .send({
      firstName: "Roman",
      lastName: "Ivasyk",
      email: "roman@example.com",
    });
  romanId = response1.body.id;

  await request(serverApp)
    .post("/users")
    .send({ firstName: "John", lastName: "Doe", email: "john@example.com" });
});

afterAll(async () => {
  await db.close();
});

describe("Users API", () => {
  it("POST /users - success", async () => {
    const response = await request(serverApp)
      .post("/users")
      .send({
        firstName: "Alice",
        lastName: "Smith",
        email: "alice@example.com",
      })
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.firstName).toBe("Alice");
    expect(response.body.lastName).toBe("Smith");
    expect(response.body.email).toBe("alice@example.com");
  });

  it("GET /users - should return all users", async () => {
    const response = await request(serverApp).get("/users").expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(2);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].firstName).toBe("Roman");
    expect(response.body[0].lastName).toBe("Ivasyk");
    expect(response.body[0].email).toBe("roman@example.com");

    expect(response.body[1].firstName).toBe("John");
    expect(response.body[1].lastName).toBe("Doe");
    expect(response.body[1].email).toBe("john@example.com");
  });

  it("GET /users/:id - should return user by ID", async () => {
    const response = await request(serverApp).get(`/users/${romanId}`).expect(200);

    expect(response.body).toHaveProperty("id", romanId);
    expect(response.body.firstName).toBe("Roman");
    expect(response.body.lastName).toBe("Ivasyk");
    expect(response.body.email).toBe("roman@example.com");
  });

  it("GET /users/:id - should return 404 if user not found", async () => {
    const response = await request(serverApp).get(`/users/9999`).expect(404);

    expect(response.body).toHaveProperty("message", "User not found");
  });

  // Новий тест для PUT /users/:id
  it("PUT /users/:id - should update user by ID", async () => {
    const response = await request(serverApp)
      .put(`/users/${romanId}`)
      .send({ firstName: "RomanUpdated", lastName: "IvasykUpdated" })
      .expect(200);

    expect(response.body).toHaveProperty("id", romanId);
    expect(response.body.firstName).toBe("RomanUpdated");
    expect(response.body.lastName).toBe("IvasykUpdated");
  });

  // Тести для DELETE
  it("DELETE /users/:id - should delete user by ID", async () => {
    const response = await request(serverApp).delete(`/users/${romanId}`).expect(200);

    expect(response.body).toHaveProperty(
      "message",
      "User successfully deleted",
    );
    expect(response.body.result).toHaveProperty("id", romanId);

    await request(serverApp).get(`/users/${romanId}`).expect(404);
  });

  it("DELETE /users/:id - should return 404 if user not found", async () => {
    const response = await request(serverApp).delete(`/users/9999`).expect(404);

    expect(response.body).toHaveProperty("message", "User not found");
  });
});
