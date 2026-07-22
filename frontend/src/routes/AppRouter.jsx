import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

// Auth Pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

// PMO Pages & Isolated Test Layout
import PMOTestLayout from "../pages/projectLifecycle/PMOTestLayout";
import ProjectDashboard from "../pages/projectLifecycle/ProjectDashboard";
import CreateProject from "../pages/projectLifecycle/CreateProject";
import ProjectDetails from "../pages/projectLifecycle/ProjectDetails";
import Milestones from "../pages/projectLifecycle/Milestones";
import Phases from "../pages/projectLifecycle/Phases";
import ProjectStatus from "../pages/projectLifecycle/ProjectStatus";
import ProjectNavbar from "../pages/projectLifecycle/ProjectNavbar";
import ProjectFiles from "../pages/projectLifecycle/ProjectFiles";
import Flow from "../pages/projectLifecycle/Flow";

// Other Module Pages
import UserList from "../pages/userManagement/UserList";
import TaskBoard from "../pages/taskManagement/Taskpage";
import ResourcePage from "../pages/resourceManagement/ResourcePage";
import RiskPage from "../pages/riskIssueManagement/RiskPage";
import ChangeRequestPage from "../pages/changeRequests/ChangeRequestPage";
import BudgetPage from "../pages/budgetDocs/BudgetPage";
import CollaborationPage from "../pages/collaboration/CollaborationPage";
import MeetingPage from "../pages/meetingManagement/MeetingPage";
import ReportsPage from "../pages/reports/ReportsPage";
import AIProjectPage from "../pages/aiProject/AIProjectPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import AdminPage from "../pages/systemAdmin/AdminPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* 1. ISOLATED TEST ROUTE (No layout wrappers around it) */}
      <Route path="/PMOTestLayout" element={<PMOTestLayout />} />

      {/* 2. AUTHENTICATION ROUTES */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* 3. MAIN DASHBOARD ROUTES */}
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<ProjectDashboard />} />
        <Route path="/project-lifecycle/create" element={<CreateProject />} />
        <Route path="/project-lifecycle/details" element={<ProjectDetails />} />
        <Route path="/project-lifecycle/milestones" element={<Milestones />} />
        <Route path="/project-lifecycle/phases" element={<Phases />} />
        <Route path="/project-lifecycle/status" element={<ProjectStatus />} />
        <Route path="/project-lifecycle/flow" element={<Flow />} />
        <Route path="/project-lifecycle/PMOTestLayout" element={<PMOTestLayout/>} />
        <Route path="/project-lifecycle/files" element={<ProjectFiles />} />
        <Route path="/project-lifecycle/navbar" element={<ProjectNavbar />} />

        {/* Core Modules */}
        <Route path="/users" element={<UserList />} />
        <Route path="/tasks" element={<TaskBoard />} />
        <Route path="/resources" element={<ResourcePage />} />
        <Route path="/risks" element={<RiskPage />} />
        <Route path="/changes" element={<ChangeRequestPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/collaboration" element={<CollaborationPage />} />
        <Route path="/meetings" element={<MeetingPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/ai" element={<AIProjectPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Route>

      {/* 4. ADMIN ROUTES */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}