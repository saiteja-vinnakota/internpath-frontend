import { Routes, Route } from "react-router-dom";

import RootLayout from "./components/layout/RootLayout";

import ProtectedRoute from "./utils/ProtectedRoute";

import LandingPage from "./pages/landing/LandingPage";

// AUTH
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// STUDENT
import StudentDashboard from "./pages/student/StudentDashboard";
import JobListingsPage from "./pages/student/JobListingsPage";
import JobDetailPage from "./pages/student/JobDetailPage";
import StudentProfilePage from "./pages/student/StudentProfilePage";
import SavedJobs from "./pages/student/SavedJobsPage";
import MyApplicationsPage from "./pages/student/MyApplicationsPage";

// RECRUITER
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import ManageListingsPage from "./pages/recruiter/ManageListingsPage";
import PostJobPage from "./pages/recruiter/PostJobPage";
import ApplicantReviewPage from "./pages/recruiter/ApplicantReviewPage";
import RecruiterProfilePage from "./pages/recruiter/RecruiterProfilePage";
import EditJobPage from "./pages/recruiter/EditJobPage";

// SHARED
import NotificationsPage from "./pages/shared/NotificationsPage";
import NotFoundPage from "./pages/shared/NotFoundPage";

import useSocket from "./hooks/useSocket";

function SocketInitializer() {
  useSocket();
  return null;
}

function App() {
  return (
    <>
      <SocketInitializer />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* STUDENT */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobListingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute role="student">
              <StudentProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/saved"
          element={
            <ProtectedRoute role="student">
              <SavedJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/applications"
          element={
            <ProtectedRoute role="student">
              <MyApplicationsPage />
            </ProtectedRoute>
          }
        />

        {/* RECRUITER */}
        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute role="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/manage-listings"
          element={
            <ProtectedRoute role="recruiter">
              <ManageListingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/post-job"
          element={
            <ProtectedRoute role="recruiter">
              <PostJobPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/applicants/:jobId"
          element={
            <ProtectedRoute role="recruiter">
              <ApplicantReviewPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/profile"
          element={
            <ProtectedRoute role="recruiter">
              <RecruiterProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/jobs/:id/edit"
          element={
            <ProtectedRoute role="recruiter">
              <EditJobPage />
            </ProtectedRoute>
          }
        />

        {/* SHARED */}
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
