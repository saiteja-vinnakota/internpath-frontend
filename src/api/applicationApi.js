import api from "./index";

// APPLY TO JOB
export const applyToJob = async (jobId) => {
  const response = await api.post(`/applications/${jobId}`);

  return response.data;
};

// GET MY APPLICATIONS
export const getMyApplications = async () => {
  const response = await api.get("/applications/me");

  return response.data;
};

// GET APPLICANTS BY JOB
export const getApplicantsByJob = async (jobId, page = 1, limit = 12) => {
  const response = await api.get(
    `/applications/job/${jobId}?page=${page}&limit=${limit}`,
  );

  return response.data;
};

// UPDATE APPLICATION STATUS
export const updateApplicationStatus = async (applicationId, formData) => {
  const response = await api.put(
    `/applications/${applicationId}/status`,

    formData,
  );

  return response.data;
};
