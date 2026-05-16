import { Router } from "express";
import {
  getJobs,
  getJob,
  createJob,
  updateJobStatus,
  deleteJob,
} from "../controllers/jobController";

const router = Router();

router.route("/").get(getJobs).post(createJob);

router.route("/:id").get(getJob).patch(updateJobStatus).delete(deleteJob);

export default router;
