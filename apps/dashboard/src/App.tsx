import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./components/home/HomePage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { Dashboard } from "./components/dashboard/Dashboard";
import { CreateMonitors } from "./components/createMonitors/createMonitors";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Monitors } from "./components/dashboard/Monitors";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route - / */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        {/* Login route - /login */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/createmonitor" element={<CreateMonitors/>} /> */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Monitors />} />
          <Route path="createmonitor" element={<CreateMonitors />} />
        </Route>
        {/* Signup route - /signup */}
        <Route path="/signup" element={<Signup />} />
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
