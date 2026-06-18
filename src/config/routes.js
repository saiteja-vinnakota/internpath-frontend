const ROUTES = {

  // COMMON
  HOME: "/",

  LOGIN: "/login",

  REGISTER: "/register",

  FORGOT_PASSWORD:
    "/forgot-password",

  // JOBS
  JOBS: "/jobs",

  JOB_DETAILS: (id) =>
    `/jobs/${id}`,

  // STUDENT
  STUDENT_DASHBOARD:
    "/student/dashboard",

  STUDENT_PROFILE:
    "/student/profile",

  SAVED_JOBS:
    "/student/saved",

  MY_APPLICATIONS:
    "/student/applications",

  // RECRUITER
  RECRUITER_DASHBOARD:
    "/recruiter/dashboard",

  MANAGE_LISTINGS:
    "/recruiter/manage-listings",

  POST_JOB:
    "/recruiter/post-job",

  APPLICANTS: (jobId) =>
    `/recruiter/applicants/${jobId}`,
};

export default ROUTES;