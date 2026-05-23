import api from "./index";

// GET AI MATCH SCORE
export const getAIMatch =
  async (jobId) => {

    const response =
      await api.get(
        `/ai/match/${jobId}`
      );

    return response.data;
  };