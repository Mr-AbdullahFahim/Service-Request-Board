import { Request, Response, NextFunction } from "express";
import JobRequest from "../models/JobRequest";

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, status } = req.query;

    const query: any = {};

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    const jobs = await JobRequest.find(query);

    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
export const getJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      res.status(404).json({ error: "Job request not found" });
      return;
    }

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Public
export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, contactEmail } = req.body;

    // Basic input validation
    if (!title || !description || !contactEmail) {
      res.status(400).json({
        error: "Please provide title, description, and contactEmail",
      });
      return;
    }

    // Email format validation handled by Mongoose schema
    const job = await JobRequest.create(req.body);

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

// @desc    Update job status
// @route   PATCH /api/jobs/:id
// @access  Public
export const updateJobStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status } = req.body;

    if (!status) {
      res.status(400).json({ error: "Please provide a status to update" });
      return;
    }

    const validStatuses = ["Open", "In Progress", "Closed"];
    if (!validStatuses.includes(status)) {
      res.status(400).json({
        error: "Invalid status. Must be Open, In Progress, or Closed",
      });
      return;
    }

    // We only update status
    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      res.status(404).json({ error: "Job request not found" });
      return;
    }

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Public
export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      res.status(404).json({ error: "Job request not found" });
      return;
    }

    await job.deleteOne();

    res.status(200).json({ message: "Job request removed successfully" });
  } catch (error) {
    next(error);
  }
};
