import request from "supertest";
import app from "../app";
import JobRequest from "../models/JobRequest";

describe("Jobs Endpoints", () => {
  let token: string;
  let testJobId: string;

  beforeEach(async () => {
    // Create a user and login to get token
    await request(app).post("/api/auth/register").send({
      name: "Job User",
      email: "jobuser@example.com",
      password: "password123",
    });

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "jobuser@example.com",
      password: "password123",
    });

    token = loginRes.body.token;

    // Create a test job
    const job = await JobRequest.create({
      title: "Test Job",
      description: "Test Description",
      category: "Plumbing",
      contactName: "John",
      contactEmail: "john@test.com",
      status: "Open",
    });

    testJobId = job._id.toString();
  });

  describe("GET /api/jobs", () => {
    it("should fetch all jobs", async () => {
      const response = await request(app).get("/api/jobs");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(1);
      expect(response.body[0].title).toBe("Test Job");
    });
  });

  describe("GET /api/jobs/:id", () => {
    it("should fetch a single job by ID", async () => {
      const response = await request(app).get(`/api/jobs/${testJobId}`);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe("Test Job");
    });

    it("should return 404 for non-existent job ID", async () => {
      // Create a valid but non-existent ObjectId
      const fakeId = "507f1f77bcf86cd799439011";
      const response = await request(app).get(`/api/jobs/${fakeId}`);
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Job request not found");
    });
  });

  describe("POST /api/jobs", () => {
    const newJob = {
      title: "New Job",
      description: "New Description",
      category: "Electrical",
      contactName: "Jane",
      contactEmail: "jane@test.com",
    };

    it("should create a new job if authenticated", async () => {
      const response = await request(app)
        .post("/api/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send(newJob);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(newJob.title);
    });

    it("should return 401 if not authenticated", async () => {
      const response = await request(app).post("/api/jobs").send(newJob);
      expect(response.status).toBe(401);
    });
  });

  describe("PATCH /api/jobs/:id", () => {
    it("should update job status if authenticated", async () => {
      const response = await request(app)
        .patch(`/api/jobs/${testJobId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ status: "In Progress" });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("In Progress");
    });

    it("should return 401 if not authenticated", async () => {
      const response = await request(app)
        .patch(`/api/jobs/${testJobId}`)
        .send({ status: "In Progress" });

      expect(response.status).toBe(401);
    });
  });

  describe("DELETE /api/jobs/:id", () => {
    it("should delete a job if authenticated", async () => {
      const response = await request(app)
        .delete(`/api/jobs/${testJobId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Job request removed successfully");

      // Verify deletion
      const getResponse = await request(app).get(`/api/jobs/${testJobId}`);
      expect(getResponse.status).toBe(404);
    });

    it("should return 401 if not authenticated", async () => {
      const response = await request(app).delete(`/api/jobs/${testJobId}`);
      expect(response.status).toBe(401);
    });
  });
});
