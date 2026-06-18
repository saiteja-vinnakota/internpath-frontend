import {
  useRef,
  useState,
} from "react";

import {
  getAIMatch,
} from "../api/aiApi";

function useAIMatch() {

  const [

    score,

    setScore,

  ] = useState(null);

  const [

    matchData,

    setMatchData,

  ] = useState(null);

  const [

    loading,

    setLoading,

  ] = useState(false);

  const [

    error,

    setError,

  ] = useState("");

  // CACHE
  const cacheRef =
    useRef({});

  // FETCH AI SCORE
  const fetchScore =
    async (
      jobId,
      forceRefresh = false
    ) => {

      try {

        // INVALID
        if (!jobId) {

          return null;
        }

        // CACHE HIT
        if (

          cacheRef.current[
            jobId
          ] &&

          !forceRefresh
        ) {

          const cachedData =

            cacheRef.current[
              jobId
            ];

          setScore(
            cachedData.score
          );

          setMatchData(
            cachedData
          );

          return cachedData;
        }

        setLoading(true);

        setError("");

        // API CALL
        const response =
          await getAIMatch(
            jobId
          );

        const data =
          response?.data;

        // SAVE STATE
        setScore(
          data?.score || 0
        );

        setMatchData(
          data || null
        );

        // CACHE STORE
        cacheRef.current[
          jobId
        ] = data;

        return data;

      } catch (err) {

        console.log(err);

        const message =

          err.response?.data
            ?.message ||

          "Failed to fetch AI score";

        setError(message);

        throw err;

      } finally {

        setLoading(false);
      }
    };

  // CLEAR SINGLE CACHE
  const clearCache =
    (jobId) => {

      if (
        cacheRef.current[
          jobId
        ]
      ) {

        delete
          cacheRef.current[
            jobId
          ];
      }
    };

  // CLEAR ALL CACHE
  const clearAllCache =
    () => {

      cacheRef.current = {};
    };

  return {

    score,

    matchData,

    loading,

    error,

    fetchScore,

    clearCache,

    clearAllCache,
  };
}

export default useAIMatch;