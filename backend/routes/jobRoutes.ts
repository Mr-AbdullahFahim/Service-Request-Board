import { Router } from "express";
import {
  getJobs,
  getJob,
  createJob,
  updateJobStatus,
  deleteJob,
} from "../controllers/jobController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

router.route("/").get(getJobs).post(protect, createJob);

router.route("/:id").get(getJob).patch(protect, updateJobStatus).delete(protect, deleteJob);

export default router;
