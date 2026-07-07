import api from "./index";

// GET CACHED AI MATCH
export const getCachedAIMatch =
  async (jobId) => {

    const response =
      await api.get(
        `/ai/match/${jobId}`
      );

    return response.data;
  };

// GENERATE AI MATCH
export const generateAIMatch =
  async (jobId) => {

    const response =
      await api.post(
        `/ai/match/${jobId}`
      );

    return response.data;
  };