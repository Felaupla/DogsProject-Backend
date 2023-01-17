const { Temperament, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Temperament model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Temperament.sync({ force: true }));
    describe("name", () => {
      it("should work when its a valid name", () => {
        Temperament.create({ name: "Dossile" });
      });
    });
  });
});
