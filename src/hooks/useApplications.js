import {
  useState,
} from "react";

import toast
from "react-hot-toast";

import {
  applyToJob,
} from "../api/applicationApi";

function useApplications() {

  const [loading, setLoading] =
    useState(false);

  // APPLY
  const apply =
    async (jobId) => {

      try {

        setLoading(true);

        const data =
          await applyToJob(
            jobId
          );

        toast.success(
          "Application submitted successfully"
        );

        return data;

      } catch (err) {

        console.log(err);

        toast.error(

          err.response?.data
            ?.message ||

          "Failed to apply"
        );

      } finally {

        setLoading(false);
      }
    };

  return {

    loading,

    apply,
  };
}

export default useApplications;