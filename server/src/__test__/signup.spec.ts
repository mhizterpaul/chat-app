import request from "supertest";
import app from "..";
import { db } from "../db/openConnection";

describe("POST /user/signup", () => {
  afterAll(async () => {
    await db.connection?.close();
  });
  test("users input is validated", () => {
    request(app)
      .post("/user/signup")
      .send({
        email: "email@unknown",
        password: "somepassword",
      })
      .set("Accept", "application/json")
      .expect(401);
  }),
    test("the user is created successfully after successful vaidation", () => {
      request(app)
        .post("/user/signup")
        .send({
          email: "email@gmail.com",
          password: "somepassword132",
          confirmPassword: "somepassword132",
        })
        .set("Accept", "application/json")
        .expect(201);
      request(app).delete("/user/delete").send({
        email: "email@gmail.com",
      });
    });
});
