import { Routes, Route } from "react-router-dom";

// Layouts
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

// Pages
import UserList from "../pages/userManagement/UserList";
import ProjectDashboard from "../pages/projectLifecycle/ProjectDashboard";
import TaskBoard from "../pages/taskManagement/Taskpage";
import ResourcePage from "../pages/resourceManagement/ResourcePage";
import RiskPage from "../pages/riskIssueManagement/RiskPage";
import ChangeRequestPage from "../pages/changeRequests/ChangeRequestPage";
import BudgetPage from "../pages/budgetDocs/BudgetPage";
import AddBudget from "../pages/budgetDocs/AddBudget";
import CollaborationPage from "../pages/collaboration/CollaborationPage";
import MeetingPage from "../pages/meetingManagement/MeetingPage";
import ReportsPage from "../pages/reports/ReportsPage";
import AIProjectPage from "../pages/aiProject/AIProjectPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import AdminPage from "../pages/systemAdmin/AdminPage";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

export default function AppRouter() {
  return (
    <div>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Dashboard Routes (Hundi keessaa jiru) */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<ProjectDashboard />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/tasks" element={<TaskBoard />} />
          <Route path="/resources" element={<ResourcePage />} />
          <Route path="/risks" element={<RiskPage />} />
          <Route path="/changes" element={<ChangeRequestPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/add-budget" element={<AddBudget />} />
          <Route path="/collaboration" element={<CollaborationPage />} />
          <Route path="/meetings" element={<MeetingPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/ai" element={<AIProjectPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </div>
  );
}