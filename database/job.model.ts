import { model, models, Schema, Document } from "mongoose";

export interface IJob {
  employer_name: string;
  employer_logo?: string;
  employer_website?: string;
  job_employment_type: string;
  job_title: string;
  job_description: string;
  job_apply_link: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
  sortOrder: number;
  isExternalApply: boolean;
}

export interface IJobDoc extends IJob, Document {}

const JobSchema = new Schema<IJob>(
  {
    employer_name: { type: String, required: true },
    employer_logo: { type: String },
    employer_website: { type: String },
    job_employment_type: { type: String, required: true },
    job_title: { type: String, required: true },
    job_description: { type: String, required: true },
    job_apply_link: { type: String, required: true },
    job_city: { type: String },
    job_state: { type: String },
    job_country: { type: String },
    sortOrder: { type: Number, required: true, default: 100 },
    isExternalApply: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Job = models?.Job || model<IJob>("Job", JobSchema);

export default Job;
