/* eslint-disable camelcase */
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import ROUTES from "@/constants/routes";
import { getJob } from "@/lib/actions/job.action";
import { processJobTitle } from "@/lib/utils";

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { id } = await params;
  const { success, data: job } = await getJob({ jobId: id });

  if (!success || !job) {
    return {
      title: "Job not found",
      description: "This job does not exist.",
    };
  }

  return {
    title: job.job_title,
    description: job.job_description?.slice(0, 160),
  };
}

const JobDetails = async ({ params }: RouteParams) => {
  const { id } = await params;
  const { success, data: job } = await getJob({ jobId: id });

  if (!success || !job) return redirect("/404");

  const {
    employer_name,
    employer_logo,
    employer_website,
    job_employment_type,
    job_title,
    job_description,
    job_apply_link,
    job_city,
    job_state,
    job_country,
  } = job;

  const locationParts = [job_city, job_state, job_country].filter(Boolean);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href={ROUTES.JOBS}
          className="paragraph-medium text-dark300_light700"
        >
          ← Back to Jobs
        </Link>
      </div>

      <section className="background-light900_dark200 light-border mt-6 flex flex-col gap-8 rounded-lg border p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {employer_logo ? (
            <Link
              href={employer_website ?? ROUTES.JOBS}
              className="background-light800_dark400 relative size-20 shrink-0 rounded-xl"
            >
              <Image
                src={employer_logo}
                alt={`${employer_name} logo`}
                fill
                className="object-contain p-2"
              />
            </Link>
          ) : (
            <Image
              src="/images/site-logo.svg"
              alt="default site logo"
              width={80}
              height={80}
              className="rounded-[10px]"
            />
          )}

          <div className="flex-1">
            <h1 className="h1-bold text-dark100_light900">
              {processJobTitle(job_title)}
            </h1>
            <p className="paragraph-semibold text-dark300_light700 mt-2">
              {employer_name}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/clock-2.svg"
                  alt="employment type"
                  width={20}
                  height={20}
                />
                <p className="body-medium text-light-500">
                  {job_employment_type}
                </p>
              </div>

              {locationParts.length > 0 && (
                <div className="background-light800_dark400 flex items-center gap-2 rounded-2xl px-3 py-1.5">
                  {job_country && (
                    <Image
                      src={`https://flagsapi.com/${job_country}/flat/64.png`}
                      alt="country flag"
                      width={16}
                      height={16}
                      className="rounded-full"
                    />
                  )}
                  <p className="body-medium text-dark400_light700">
                    {locationParts.join(", ")}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Image
                  src="/icons/currency-dollar-circle.svg"
                  alt="salary"
                  width={20}
                  height={20}
                />
                <p className="body-medium text-light-500">Not disclosed</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="h3-bold text-dark200_light900">Job Description</h2>
          <p className="body-regular text-dark400_light700 mt-4 whitespace-pre-wrap">
            {job_description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href={job_apply_link ?? ROUTES.JOBS}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-gradient flex items-center gap-2 rounded-lg px-6 py-3"
          >
            <p className="body-semibold text-light-900!">Apply / View posting</p>
            <Image
              src="/icons/arrow-up-right.svg"
              alt="open link"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </section>
    </>
  );
};

export default JobDetails;
