/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Temperament, conn } = require("../../src/db.js");

const agent = session(app);
const temperaments = {
  name: "dossile",
};

describe("Temperament routes", () => {
  before(async () => {
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
    await Temperament.sync({ force: true });
  });
  beforeEach(() => {
    Temperament.truncate();
  });
  describe("GET /temperaments", () => {
    it("should get 200", async () => {
      Temperament.create(temperaments);
      agent.get("/temperaments").expect(200);
    });
    it("No Temperaments in database", async () => {
      agent.get("/temperaments").expect(404);
    });
  });
});
