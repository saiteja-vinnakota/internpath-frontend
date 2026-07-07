import { useRef, useState } from "react";

import { getCachedAIMatch, generateAIMatch } from "../api/aiApi";

function useAIMatch() {
  const [score, setScore] = useState(null);

  const [matchData, setMatchData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const cacheRef = useRef({});

  // CHECK CACHE ONLY
  const checkCachedScore = async (jobId) => {
    if (!jobId) return null;

    if (cacheRef.current[jobId]) {
      const cached = cacheRef.current[jobId];

      setScore(cached.score);

      setMatchData(cached);

      return cached;
    }

    try {
      setLoading(true);

      setError("");

      const response = await getCachedAIMatch(jobId);

      const data = response.data;

      setScore(data.score);

      setMatchData(data);

      cacheRef.current[jobId] = data;

      return data;
    } catch (err) {
      // NO CACHE
      if (err.response?.status === 404) {
        setMatchData(null);

        setScore(null);

        return null;
      }

      setError(err.response?.data?.message || "Failed to fetch AI score");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // GENERATE
  const fetchScore = async (jobId, forceRefresh = false) => {
    if (!jobId) return null;

    if (cacheRef.current[jobId] && !forceRefresh) {
      const cached = cacheRef.current[jobId];

      setScore(cached.score);

      setMatchData(cached);

      return cached;
    }

    try {
      setLoading(true);

      setError("");

      const response = await generateAIMatch(jobId);

      const data = response.data;

      setScore(data.score);

      setMatchData(data);

      cacheRef.current[jobId] = data;

      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate AI score");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearCache = (jobId) => {
    delete cacheRef.current[jobId];
  };

  const clearAllCache = () => {
    cacheRef.current = {};
  };

  return {
    score,

    matchData,

    loading,

    error,

    checkCachedScore,

    fetchScore,

    clearCache,

    clearAllCache,
  };
}

export default useAIMatch;
