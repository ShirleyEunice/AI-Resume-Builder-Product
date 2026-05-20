import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import JdMatcher from "./pages/jdMatcher";
import CoverLetter from "./pages/CoverLetter";
import InterviewChat from "./pages/InterviewChat";
import Upgrade from "./Upgrade";
import Success from "./pages/Success";
import ResumeBuilder from "./pages/ResumeBuilder";

function App() {

  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-tools" element={<ResumeAnalyzer />} />
          <Route path="/jd-matcher" element={<JdMatcher />} />
          <Route path="/cover-letter" element={<CoverLetter />} />
          <Route path="/interview" element={<InterviewChat />} />
          <Route path="/payment" element={<Upgrade />} />
          <Route path="/success" element={<Success />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route
            path="/failed"
            element={<div>Payment Failed. Please try again.</div>}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;