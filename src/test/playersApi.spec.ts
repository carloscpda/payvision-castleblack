import request from "supertest";
import server from "../server";
import { players } from "../data";

describe("Castleblack API players", () => {
  it("should retrieve all players", (done) => {
    request(server)
      .get("/api/players")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, players, done);
  });

  it("should create a new player", (done) => {
    const newPlayerReq = { name: "Sansa", age: 21 };
    request(server)
      .post("/api/players")
      .send(newPlayerReq)
      .set("Accept", "application/json")
      .expect("Location", /players\/[0-9]+/)
      .expect(201, done);
  });

  it("should fail at create a new player without name", (done) => {
    const newPlayerReq = { age: 21 };
    request(server)
      .post("/api/players")
      .send(newPlayerReq)
      .set("Accept", "application/json")
      .expect(400, done);
  });

  it("should fail at create a new player without age", (done) => {
    const newPlayerReq = { name: "Sansa" };
    request(server)
      .post("/api/players")
      .send(newPlayerReq)
      .set("Accept", "application/json")
      .expect(400, done);
  });

  it("should fail at create a new player with age out of range", (done) => {
    const newPlayerReq = { name: "Sansa", age: -5 };
    request(server)
      .post("/api/players")
      .send(newPlayerReq)
      .set("Accept", "application/json")
      .expect(400, done);
  });

  it("should retrieve a player by id", (done) => {
    request(server)
      .get("/api/players/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, players[0], done);
  });

  it("should fail at retrive a player not created", (done) => {
    request(server)
      .get("/api/players/10")
      .set("Accept", "application/json")
      .expect(404, done);
  });

  it("should update player weapon", (done) => {
    const body = { weapon: 1 };
    request(server)
      .post("/api/players/1/arm")
      .send(body)
      .set("Accept", "application/json")
      .expect("Location", /players\/[0-9]+/)
      .expect(200, done);
  });

  it("should fail at update wrong player weapon", (done) => {
    const body = { weapon: 2 };
    request(server)
      .post("/api/players/1/arm")
      .send(body)
      .set("Accept", "application/json")
      .expect(404, done);
  });

  it("should kill a player (sets player health to 0)", (done) => {
    request(server)
      .post("/api/players/1/kill")
      .set("Accept", "application/json")
      .expect("Location", /players\/[0-9]+/)
      .expect(200, done);
  });
});
