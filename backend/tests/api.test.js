//backend/tests/api.test.js
import request from "supertest";
import app from "../server/server.js";
import { pool } from "../db/conexionDB.js";
let token = "";
afterAll(async () => {
  await pool.end();
});

/* ---------------- LOGIN ---------------- */

describe("POST /login", () => {
  test("Login correcto → 200", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        email: "admin@test.com",
        password: "asd123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

  test("Login incorrecto → 401", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        email: "fake@test.com",
        password: "wrong"
      });

    expect(res.statusCode).toBe(401);
  });
});

/* ---------------- PUBLICACIONES ---------------- */

describe("GET /publicaciones", () => {
  test("Lista publicaciones → 200", async () => {
    const res = await request(app).get("/publicaciones");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("POST /publicaciones", () => {
  test("Crear publicación sin token → 401", async () => {
    const res = await request(app)
      .post("/publicaciones")
      .send({
        titulo: "Test",
        descripcion: "Desc",
        imagenurl: "url",
        precio: 1000
      });

    expect(res.statusCode).toBe(401);
  });

  test("Crear publicación con token → 201", async () => {
    const res = await request(app)
      .post("/publicaciones")
      .set("Authorization", `Bearer ${token}`)
      .send({
        titulo: "Test",
        descripcion: "Desc",
        imagenurl: "https://placedog.net/400/463?id=35",
        precio: 1000
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
  });
});

/* ---------------- USUARIOS ---------------- */

describe("GET /usuarios", () => {
  test("Sin token → 401", async () => {
    const res = await request(app).get("/usuarios");

    expect(res.statusCode).toBe(401);
  });

  test("Con token admin → 200", async () => {
    const res = await request(app)
      .get("/usuarios")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
