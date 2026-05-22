const ROUTES = {

  HOME: "/",

  LOGIN: "/login",

  REGISTER: "/register",

  JOBS: "/jobs",

  JOB_DETAILS: (id) =>
    `/jobs/${id}`,
};

export default ROUTES;