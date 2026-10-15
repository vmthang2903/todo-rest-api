import { test, describe } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";

describe("Todo API", () => {
  test("GET / says the API is running", async () => {
    const res = await request(app).get("/");

    assert.equal(res.status, 200);
    assert.equal(res.body.message, "Todo REST API is running!");
  });

  test("GET /todos returns an array", async () => {
    const res = await request(app).get("/todos");

    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
  });

  test("POST /todos creates a todo and trims the title", async () => {
    const res = await request(app)
      .post("/todos")
      .send({ title: "  buy milk  " });

    assert.equal(res.status, 201);
    assert.equal(res.body.title, "buy milk");
    assert.equal(res.body.completed, false);
  });

  test("POST /todos with empty title returns 400", async () => {
    const res = await request(app).post("/todos").send({ title: "   " });

    assert.equal(res.status, 400);
  });

  test("POST /todos with no body returns 400", async () => {
    const res = await request(app).post("/todos");

    assert.equal(res.status, 400);
  });

  test("POST /todos with broken JSON returns 400", async () => {
    const res = await request(app)
      .post("/todos")
      .set("Content-Type", "application/json")
      .send('{ "title": ');

    assert.equal(res.status, 400);
  });

  test("GET /todos/:id returns 400 for invalid id", async () => {
    const res = await request(app).get("/todos/abc");

    assert.equal(res.status, 400);
  });

  test("GET /todos/:id returns 404 for missing todo", async () => {
    const res = await request(app).get("/todos/99999");

    assert.equal(res.status, 404);
  });

  test("PUT /todos/:id updates only the fields sent", async () => {
    const created = await request(app).post("/todos").send({ title: "old" });
    const id = created.body.id;

    const res = await request(app)
      .put(`/todos/${id}`)
      .send({ completed: true });

    assert.equal(res.status, 200);
    assert.equal(res.body.title, "old");
    assert.equal(res.body.completed, true);
  });

  test("PUT /todos/:id returns 404 for missing todo", async () => {
    const res = await request(app)
      .put("/todos/99999")
      .send({ completed: true });

    assert.equal(res.status, 404);
  });

  test("DELETE /todos/:id removes the todo", async () => {
    const created = await request(app).post("/todos").send({ title: "temp" });
    const id = created.body.id;

    const del = await request(app).delete(`/todos/${id}`);
    console.log(del.body); // add this
    assert.equal(del.status, 204);

    const get = await request(app).get(`/todos/${id}`);
    assert.equal(get.status, 404);
  });

  test("ids stay unique after a delete", async () => {
    const a = await request(app).post("/todos").send({ title: "a" });
    const b = await request(app).post("/todos").send({ title: "b" });
    await request(app).delete(`/todos/${a.body.id}`);
    const c = await request(app).post("/todos").send({ title: "c" });

    assert.notEqual(c.body.id, b.body.id);
  });

  test("unknown route returns 404", async () => {
    const res = await request(app).get("/abc");

    assert.equal(res.status, 404);
  });
});
