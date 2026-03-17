import request from "supertest";
import { app } from "../server";

beforeAll(() => {
  console.log("[TEST] Iniciando execução dos testes da API");
});

afterAll(() => {
  console.log("[TEST] Finalizando execução dos testes da API");
});

beforeEach(() => {
  const currentTestName = expect.getState().currentTestName;
  console.log(`[TEST] Iniciando: ${currentTestName}`);
});

afterEach(() => {
  const currentTestName = expect.getState().currentTestName;
  console.log(`[TEST] Concluído: ${currentTestName}`);
});

describe("GET /", () => {
  it("deve retornar status 200 e mensagem de funcionamento", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});

describe("CRUD /products", () => {
  beforeEach(async () => {
    await request(app).delete("/products/reset").expect(204);
  });

  it("deve criar um produto", async () => {
    const payload = {
      name: "Mouse Gamer",
      price: 199.9,
      category: "Perifericos",
    };

    const response = await request(app).post("/products").send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(payload);
    expect(response.body.id).toBe(1);
  });

  it("deve listar produtos", async () => {
    await request(app).post("/products").send({
      name: "Teclado",
      price: 120,
      category: "Perifericos",
    });

    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      id: 1,
      name: "Teclado",
      price: 120,
      category: "Perifericos",
    });
  });

  it("deve editar um produto", async () => {
    const created = await request(app).post("/products").send({
      name: "Mouse",
      price: 100,
      category: "Perifericos",
    });

    const response = await request(app)
      .put(`/products/${created.body.id}`)
      .send({
        name: "Mouse Pro",
        price: 250,
        category: "Perifericos",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: created.body.id,
      name: "Mouse Pro",
      price: 250,
      category: "Perifericos",
    });
  });

  it("deve deletar um produto", async () => {
    const created = await request(app).post("/products").send({
      name: "Headset",
      price: 300,
      category: "Audio",
    });

    const deleteResponse = await request(app).delete(`/products/${created.body.id}`);
    const listResponse = await request(app).get("/products");

    expect(deleteResponse.status).toBe(204);
    expect(listResponse.status).toBe(200);
    expect(listResponse.body).toEqual([]);
  });
});
