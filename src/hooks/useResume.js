import {
  useState,
} from "react";

import {

  uploadResume,

  analyzeResume,

} from "../api/resumeApi";

import {
  getErrorMessage,
} from "../utils/errorHandler";

function useResume() {

  const [
    loading,
    setLoading,
  ] = useState(false);

  const upload =
    async (file) => {

      try {

        setLoading(true);

        return await uploadResume(
          file
        );

      } catch (error) {

        throw new Error(
          getErrorMessage(
            error
          )
        );

      } finally {

        setLoading(false);
      }
    };

  const analyze =
    async () => {

      try {

        setLoading(true);

        return await analyzeResume();

      } catch (error) {

        throw new Error(
          getErrorMessage(
            error
          )
        );

      } finally {

        setLoading(false);
      }
    };

  return {

    loading,

    upload,

    analyze,
  };
}

export default useResume;