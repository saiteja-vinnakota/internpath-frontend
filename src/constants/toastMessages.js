export const TOAST_MESSAGES = {
  // AUTH
  AUTH: {
    LOGIN_SUCCESS: "Login successful",
    LOGIN_FAILED: "Login failed",
    REGISTER_SUCCESS: "Account created successfully",
    REGISTER_FAILED: "Registration failed",
    LOGOUT_SUCCESS: "Logged out successfully",
  },

  // APPLICATION
  APPLICATION: {
    APPLIED_SUCCESS: "Application submitted successfully",
    APPLIED_FAILED: "Failed to submit application",
    APPLY_DUPLICATE: "You have already applied to this job",
  },

  // JOBS
  JOBS: {
    CREATED_SUCCESS: "Job posted successfully",
    CREATED_FAILED: "Failed to post job",
    UPDATED_SUCCESS: "Job updated successfully",
    UPDATED_FAILED: "Failed to update job",
    DELETED_SUCCESS: "Job deleted successfully",
    DELETED_FAILED: "Failed to delete job",
  },

  // PROFILE
  PROFILE: {
    UPDATED_SUCCESS: "Profile updated successfully",
    UPDATED_FAILED: "Failed to update profile",
  },

  // GENERAL
  ERROR: "An error occurred. Please try again.",
  LOADING: "Loading...",
  SUCCESS: "Success",
};

export const getToastMessage = (
  category,
  key,
  fallback = TOAST_MESSAGES.ERROR,
) => {
  return TOAST_MESSAGES[category]?.[key] || fallback;
};
