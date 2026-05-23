import api from "./index";

// GET ALL JOBS
export const getJobs = async ({
  page = 1,
  limit = 6,
  keyword = "",
  type = "",
  location = "",
  sort = "createdAt",
} = {}) => {

  const response =
    await api.get(
      "/jobs",
      {
        params: {

          page,

          limit,

          keyword,

          type,

          location,

          sort,
        },
      }
    );

  return response.data;
};

// GET SINGLE JOB
export const getSingleJob =
  async (jobId) => {

    const response =
      await api.get(
        `/jobs/${jobId}`
      );

    return response.data;
  };

// SAVE JOB
export const saveJob =
  async (jobId) => {

    const response =
      await api.post(
        `/saved-jobs/${jobId}`
      );

    return response.data;
  };

// UNSAVE JOB
export const unsaveJob =
  async (jobId) => {

    const response =
      await api.delete(
        `/saved-jobs/${jobId}`
      );

    return response.data;
  };