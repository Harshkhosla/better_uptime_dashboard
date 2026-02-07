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
import { ResetPassword } from "./components/auth/ResetPassword";
import { CreateMonitors } from "./components/createMonitors/CreateMonitors";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Monitors } from "./components/dashboard/Monitors";
import { MonitorDetail } from "./components/dashboard/MonitorDetail";
import { Notifications } from "./components/dashboard/Notifications";
import { Users } from "./components/dashboard/Users";
import { Analytics } from "./components/dashboard/Analytics";
import { Documents } from "./components/dashboard/Documents";
import { Settings } from "./components/dashboard/Settings";

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
          <Route path="monitors" element={<Monitors />} />
          <Route path="createmonitor" element={<CreateMonitors />} />
          <Route path="monitor/:id" element={<MonitorDetail />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="users" element={<Users />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="documents" element={<Documents />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        {/* Signup route - /signup */}
        <Route path="/signup" element={<Signup />} />
        {/* Reset Password route - /reset-password */}
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
