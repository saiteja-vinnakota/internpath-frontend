import api from "./index";

// APPLY TO JOB
export const applyToJob =
  async (jobId) => {

    const response =
      await api.post(
        `/applications/${jobId}`
      );

    return response.data;
  };

// GET MY APPLICATIONS
export const getMyApplications =
  async () => {

    const response =
      await api.get(
        "/applications/me"
      );

    return response.data;
  };