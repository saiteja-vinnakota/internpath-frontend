import api from "./index";

// GET ALL JOBS
export const getJobs = async ({
  page = 1,
  limit = 6,
  keyword = "",
  mode = "",
  category = "",
  duration = "",
  stipend = "",
  location = "",
  batch = "",
  sort = "createdAt",
} = {}) => {
  const response = await api.get("/jobs", {
    params: {
      page,
      limit,
      keyword,
      mode,
      category,
      duration,
      stipend,
      location,
      batch,
      sort,
    },
  });

  return response.data;
};

// GET SINGLE JOB
export const getSingleJob = async (jobId) => {
  const response = await api.get(`/jobs/${jobId}`);

  return response.data;
};

// SAVE JOB
export const saveJob = async (jobId) => {
  const response = await api.post(`/saved-jobs/${jobId}`);

  return response.data;
};

// UNSAVE JOB
export const unsaveJob = async (jobId) => {
  const response = await api.delete(`/saved-jobs/${jobId}`);

  return response.data;
};

// GET RECRUITER JOBS
export const getRecruiterJobs = async () => {
  const response = await api.get("/jobs/recruiter/me");

  return response.data;
};

// CREATE JOB
export const createJob = async (formData) => {
  const response = await api.post("/jobs", formData);

  return response.data;
};

// UPDATE JOB
export const updateJob = async (jobId, formData) => {
  const response = await api.put(`/jobs/${jobId}`, formData);

  return response.data;
};

export const closeJob = async (jobId) => {
  const response = await api.put(`/jobs/${jobId}/close`);

  return response.data;
};
// DELETE JOB
export const deleteJob = async (jobId) => {
  const response = await api.delete(`/jobs/${jobId}`);

  return response.data;
};
