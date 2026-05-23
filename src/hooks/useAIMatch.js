import {
  useState,
} from "react";

import {
  getAIMatch,
} from "../api/aiApi";

function useAIMatch() {

  const [score, setScore] =
    useState(null);

  const [matchData, setMatchData] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // FETCH AI SCORE
  const fetchScore =
    async (jobId) => {

      try {

        setLoading(true);

        setError("");

        const data =
          await getAIMatch(
            jobId
          );

        setScore(
          data.data.score
        );

        setMatchData(
          data.data
        );

      } catch (err) {

        console.log(err);

        setError(

          err.response?.data
            ?.message ||

          "Failed to fetch AI score"
        );

      } finally {

        setLoading(false);
      }
    };

  return {

    score,

    matchData,

    loading,

    error,

    fetchScore,
  };
}

export default useAIMatch;