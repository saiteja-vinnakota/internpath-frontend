import api from "./index";

// GET SAVED JOBS
export const getSavedJobs = async () => {
  const response = await api.get("/saved-jobs");

  return response.data;
};

// SAVE JOB
export const saveJob = async (jobId) => {
  const response = await api.post(`/saved-jobs/${jobId}`);

  return response.data;
};

// REMOVE SAVED JOB
export const removeSavedJob = async (jobId) => {
  const response = await api.delete(`/saved-jobs/${jobId}`);

  return response.data;
};
