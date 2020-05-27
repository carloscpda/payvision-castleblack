import request from "supertest";
import server from "../server";
import { objects, players } from "../data";

describe("Castleblack API", () => {
  it("should list all objects", (done) => {
    request(server)
      .get("/api/objects")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, objects, done);
  });
});
