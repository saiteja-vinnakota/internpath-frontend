import { Routes, Route } from "react-router-dom";

import RootLayout from "./components/layout/RootLayout";

import ProtectedRoute from "./utils/ProtectedRoute";

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

function App() {
  return (
    <Routes>
      {/* LANDING */}
      <Route
        path="/"
        element={
          <RootLayout>
            <div
              className="
                min-h-screen
                flex
                items-center
                justify-center
                text-4xl
                font-serif
                text-primary
              "
            >
              InternPath
            </div>
          </RootLayout>
        }
      />

      {/* AUTH */}
      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* STUDENT */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* JOB LISTINGS */}
      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <JobListingsPage />
          </ProtectedRoute>
        }
      />

      {/* JOB DETAIL */}
      <Route
        path="/jobs/:id"
        element={
          <ProtectedRoute>
            <JobDetailPage />
          </ProtectedRoute>
        }
      />

      {/* STUDENT PROFILE */}
      <Route
        path="/student/profile"
        element={
          <ProtectedRoute>
            <StudentProfilePage />
          </ProtectedRoute>
        }
      />

      {/* SAVED JOBS */}
      <Route
        path="/student/saved"
        element={
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        }
      />
      {/* MY APPLICATIONS */}
      <Route
        path="/student/applications"
        element={
          <ProtectedRoute>
            <MyApplicationsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
