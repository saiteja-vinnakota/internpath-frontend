import { useState } from "react";

import { showToast } from "../utils/toastService";

import { TOAST_MESSAGES } from "../constants/toastMessages";

import {
  getApplicantsByJob,
  updateApplicationStatus,
} from "../api/applicationApi";

function useApplicants() {
  const [applicants, setApplicants] = useState([]);

  const [loading, setLoading] = useState(false);

  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 1,
  });

  // FETCH APPLICANTS
  const fetchApplicants = async (jobId, page = 1, limit = 12) => {
    try {
      setLoading(true);

      setError("");

      const result = await getApplicantsByJob(jobId, page, limit);

      // API returns wrapper { success, message, data: { data: [...], pagination } }
      const serviceResult = result?.data || result; // tolerate either shape

      setApplicants(serviceResult?.data || []);

      if (serviceResult?.pagination) {
        setPagination(serviceResult.pagination);
      }
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Failed to fetch applicants");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE STATUS
  const handleStatusUpdate = async (applicationId, status) => {
    try {
      setActionLoading(true);

      await updateApplicationStatus(
        applicationId,

        { status },
      );

      // OPTIMISTIC UPDATE
      setApplicants((prev) =>
        prev.map((application) =>
          application._id === applicationId
            ? {
                ...application,

                status,
              }
            : application,
        ),
      );

      // TOASTS
      if (status === "shortlisted") {
        showToast.success("Applicant shortlisted");
      } else if (status === "interview") {
        showToast.success("Interview stage started");
      } else if (status === "selected") {
        showToast.success("Applicant selected");
      } else if (status === "rejected") {
        showToast.success("Applicant rejected");
      }
    } catch (err) {
      console.log(err);

      showToast.error(err.response?.data?.message || "Failed to update status");

      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  return {
    applicants,

    loading,

    actionLoading,

    error,

    pagination,

    fetchApplicants,

    handleStatusUpdate,
  };
}

export default useApplicants;
