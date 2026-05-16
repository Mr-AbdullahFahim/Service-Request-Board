import mongoose, { Schema, Document } from "mongoose";

export interface IJobRequest extends Document {
  title: string;
  description: string;
  category?: string;
  location?: string;
  contactName?: string;
  contactEmail: string;
  status: "Open" | "In Progress" | "Closed";
  createdAt: Date;
}

const JobRequestSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  contactName: {
    type: String,
    trim: true,
  },
  contactEmail: {
    type: String,
    required: [true, "Contact email is required"],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IJobRequest>("JobRequest", JobRequestSchema);
