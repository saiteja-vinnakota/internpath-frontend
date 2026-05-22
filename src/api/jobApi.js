import api from "./index";

// GET ALL JOBS
export const getJobs = async ({
  page = 1,
  limit = 6,
  keyword = "",
  type = "",
  sort = "createdAt",
}) => {

  const response = await api.get(
    "/jobs",
    {
      params: {
        page,
        limit,
        keyword,
        type,
        sort,
      },
    }
  );

  return response.data;
};

// GET SINGLE JOB
export const getSingleJob = async (
  jobId
) => {

  const response = await api.get(
    `/jobs/${jobId}`
  );

  return response.data;
};