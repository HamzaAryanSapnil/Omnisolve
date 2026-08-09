"use server";

import { cache } from "react";

import Job from "@/database/job.model";
import action from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import dbConnect from "@/lib/mongoose";
import { GetJobSchema } from "@/lib/validations";

function mapJob(job: Record<string, unknown>): Job {
  return {
    id: String(job._id),
    employer_name: job.employer_name as string,
    employer_logo: job.employer_logo as string | undefined,
    employer_website: job.employer_website as string | undefined,
    job_employment_type: job.job_employment_type as string,
    job_title: job.job_title as string,
    job_description: job.job_description as string,
    job_apply_link: job.job_apply_link as string,
    job_city: job.job_city as string | undefined,
    job_state: job.job_state as string | undefined,
    job_country: job.job_country as string | undefined,
    isExternalApply: Boolean(job.isExternalApply),
  };
}

export const fetchLocation = async () => {
  try {
    const response = await fetch("http://ip-api.com/json/?fields=country");
    const location = await response.json();
    return location.country;
  } catch {
    return "Remote";
  }
};

export const fetchCountries = async () => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name"
    );
    const result = await response.json();
    return Array.isArray(result) ? result : [];
  } catch {
    return [];
  }
};

export const fetchJobs = async (
  filters: JobFilterParams
): Promise<{ jobs: Job[]; isNext: boolean }> => {
  const { query, page, useLocalFilter } = filters;
  const pageNumber = Math.max(1, parseInt(String(page ?? "1"), 10) || 1);
  const pageSize = 10;
  const skip = (pageNumber - 1) * pageSize;

  await dbConnect();

  const mongoFilter: Record<string, unknown> = {};

  if (useLocalFilter && query) {
    const terms = query
      .toLowerCase()
      .split(/[,\s]+/)
      .map((part) => part.trim())
      .filter(Boolean)
      .filter((part) => part !== "undefined" && part !== "null");

    if (terms.length > 0) {
      mongoFilter.$or = terms.flatMap((term) => {
        const regex = new RegExp(term, "i");
        return [
          { job_title: regex },
          { job_description: regex },
          { employer_name: regex },
          { job_city: regex },
          { job_state: regex },
          { job_country: regex },
          { job_employment_type: regex },
        ];
      });
    }
  }

  const [total, jobs] = await Promise.all([
    Job.countDocuments(mongoFilter),
    Job.find(mongoFilter)
      .sort({ sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean(),
  ]);

  return {
    jobs: jobs.map((job) => mapJob(job as Record<string, unknown>)),
    isNext: total > skip + jobs.length,
  };
};

export const getJob = cache(async function getJob(
  params: GetJobParams
): Promise<ActionResponse<Job>> {
  const validationResult = await action({
    params,
    schema: GetJobSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { jobId } = validationResult.params!;

  try {
    await dbConnect();

    const job = await Job.findById(jobId).lean();

    if (!job) throw new Error("Job not found");

    return { success: true, data: mapJob(job as Record<string, unknown>) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
});
