import request from "supertest";
import server from "../server";
import { objects } from "../data";

describe("Castleblack API objects", () => {
  it("should retrieve all objects", (done) => {
    request(server)
      .get("/api/objects")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, objects, done);
  });

  it("should create a new object", (done) => {
    const newObjectReq = { name: "axe", value: -33 };
    request(server)
      .post("/api/objects")
      .send(newObjectReq)
      .set("Accept", "application/json")
      .expect("Location", /objects\/[0-9]+/)
      .expect(201, done);
  });

  it("should fail at create a new object without name", (done) => {
    const newObjectReq = { value: -33 };
    request(server)
      .post("/api/objects")
      .send(newObjectReq)
      .set("Accept", "application/json")
      .expect(400, done);
  });

  it("should fail at create a new object without value", (done) => {
    const newObjectReq = { name: "axe" };
    request(server)
      .post("/api/objects")
      .send(newObjectReq)
      .set("Accept", "application/json")
      .expect(400, done);
  });

  it("should fail at create a new object with bad value format", (done) => {
    const newObjectReq = { name: "axe", value: "ten" };
    request(server)
      .post("/api/objects")
      .send(newObjectReq)
      .set("Accept", "application/json")
      .expect(400, done);
  });

  it("should retrieve a object by id", (done) => {
    request(server)
      .get("/api/objects/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, objects[0], done);
  });

  it("should fail at retrive a object not created", (done) => {
    request(server)
      .get("/api/objects/10")
      .set("Accept", "application/json")
      .expect(404, done);
  });

  it("should upgrade object value", (done) => {
    const body = { value: -5 };
    request(server)
      .post("/api/objects/1/upgrade")
      .send(body)
      .set("Accept", "application/json")
      .expect("Location", /objects\/[0-9]+/)
      .expect(200, done);
  });

  it("should fail at upgrade object value with bad format", (done) => {
    const body = { value: "two" };
    request(server)
      .post("/api/objects/1/upgrade")
      .send(body)
      .set("Accept", "application/json")
      .expect(400, done);
  });

  it("should remove an object", (done) => {
    request(server)
      .delete("/api/objects/1")
      .set("Accept", "application/json")
      .expect(204, done);
  });

  it("should fail at remove a nonexistent object", (done) => {
    request(server)
      .delete("/api/objects/10")
      .set("Accept", "application/json")
      .expect(404, done);
  });
});
