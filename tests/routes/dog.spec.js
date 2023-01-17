/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  name: "CANICHE NEGRA",
  image:
    "https://thumbs.dreamstime.com/z/perrito-del-caniche-de-juguete-sobre-el-fondo-blanco-24171248.jpg",
  height: "12-15",
  weight: "20-25",
  life_span: "13",
  createdInDb: true,
  temperaments: "Vigilant",
};

describe("Dog routes", () => {
  before(async () => {
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
    await Dog.sync({ force: true });
  });
  beforeEach(() => {
    Dog.truncate();
  });
  describe("GET /dogs", () => {
    it("should get 200", async () => {
      Dog.create(dog);
      agent.get("/dogs").expect(200);
    });
    it("No Dogs in database", async () => {
      agent.get("/dogs").expect(404);
    });
  });
  describe("GET /dogs/:id", () => {
    it("should get 200", async () => {
      agent.get("/dogs/:15").expect(200);
    });
  });
  describe("GET /dogs/?name", () => {
    it("should get 200", async () => {
      agent.get("/dogs/?name=CANICHE NEGRA").expect(200);
    });
  });
});
