import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import ATSAnalyzer from "./pages/ats/ATSAnalyzer";
import ATSLoading from "./pages/ats/ATSLoading";
import ATSResults from "./pages/ats/ATSResults";
import AppLayout from "./layouts/AppLayout";

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
            path="/failed"
            element={<div>Payment Failed. Please try again.</div>}
          />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/ats" element={<ATSAnalyzer />} />

          <Route path="/ats/loading" element={<ATSLoading />} />

          <Route path="/ats/results" element={<ATSResults />} />

          <Route path="/resume-builder" element={<ResumeBuilder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
