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