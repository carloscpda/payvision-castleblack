import request from "supertest";
import server from "../server";
import { objects } from "../data";
import db from "../db";

describe("Castleblack API objects", () => {
  beforeEach(() => {
    return db.seed();
  });

  it("should retrieve all objects", (done) => {
    request(server)
      .get("/api/objects")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, objects, done);
  });
});
