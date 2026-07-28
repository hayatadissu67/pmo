import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

// Project Lifecycle Components & Layout
import PMOTestLayout from "../pages/projectLifecycle/PMOTestLayout";
import CreateProject from "../pages/projectLifecycle/CreateProject";
import Flow from "../pages/projectLifecycle/Flow";
import Milestones from "../pages/projectLifecycle/Milestones";
import Phases from "../pages/projectLifecycle/Phases";
import ProjectDashboard from "../pages/projectLifecycle/ProjectDashboard";
import ProjectDetails from "../pages/projectLifecycle/ProjectDetails";
import ProjectNavbar from "../pages/projectLifecycle/ProjectNavbar";
import ProjectFiles from "../pages/projectLifecycle/ProjectFiles";
import ProjectStatus from "../pages/projectLifecycle/ProjectStatus";
import ProjectRiskAssignment from "../pages/projectLifecycle/ProjectRiskAssignment";

// Other Pages
import UserList from "../pages/userManagement/UserList";
import TaskBoard from "../pages/taskManagement/Taskpage";
import ResourcePage from "../pages/resourceManagement/ResourcePage";
import RiskPage from "../pages/riskIssueManagement/RiskPage";
import CreateRisk from "../pages/riskIssueManagement/CreateRisk";
import CreateIssue from "../pages/riskIssueManagement/CreateIssue";
import EditIssue from "../pages/riskIssueManagement/EditIssue";
import EditRisk from "../pages/riskIssueManagement/EditRisk";
import IssueDetails from "../pages/riskIssueManagement/IssueDetails";
import IssueList from "../pages/riskIssueManagement/IssueList";
import IssueResolution from "../pages/riskIssueManagement/IssueResolution";
import RiskAssessment from "../pages/riskIssueManagement/RiskAssessment";
import RiskDetails from "../pages/riskIssueManagement/RiskDetails";
import RiskList from "../pages/riskIssueManagement/RiskList";
import RiskMitigation from "../pages/riskIssueManagement/RiskMitigation";
import RiskNavbar from "../pages/riskIssueManagement/RiskNavbar";
import RiskReport from "../pages/riskIssueManagement/RiskReport";
import RiskMatrix from "../pages/riskIssueManagement/RiskMatrix";
import ChangeRequestPage from "../pages/changeRequests/ChangeRequestPage";
import BudgetPage from "../pages/budgetDocs/BudgetPage";
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
    <Routes>
      {/* Auth Layout Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Project Lifecycle Layout Routes */}
      <Route path="/projectlifecycle" element={<PMOTestLayout />}>
        <Route index element={<ProjectDashboard />} />
        <Route path="create" element={<CreateProject />} />
        <Route path="flow" element={<Flow />} />
        <Route path="milestones" element={<Milestones />} />
        <Route path="phases" element={<Phases />} />
        <Route path="details" element={<ProjectDetails />} />
        <Route path="navbar" element={<ProjectNavbar />} />
        <Route path="files" element={<ProjectFiles />} />
        <Route path="status" element={<ProjectStatus />} />
        <Route path="risk-assignment" element={<ProjectRiskAssignment />} />
      </Route>

      {/* Main Dashboard Layout Routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<ProjectDashboard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/tasks" element={<TaskBoard />} />
        <Route path="/resources" element={<ResourcePage />} />
        <Route path="/risks" element={<RiskPage />} />
        <Route path="/riskissuemanagement/createIssue" element={<CreateIssue />} />
        <Route path="/riskissuemanagenet/createRisk" element={<CreateRisk />} />
        <Route path="/riskissuemanagenet/EditIssue" element={<EditIssue />} />
        <Route path="/riskissuemanagenet/EditRisk" element={<EditRisk />} />
        <Route path="/riskissuemanagenet/IssueDeatails" element={<IssueDetails />} />
        <Route path="/riskissuemanagenet/IssueList" element={<IssueList />} />
        <Route path="/riskissuemanagenet/IssueResolution" element={<IssueResolution />} />
        <Route path="/riskissuemanagenet/RiskAssessment" element={<RiskAssessment />} />
        <Route path="/riskissuemanagenet/RiskDetails" element={<RiskDetails />} />
        <Route path="/riskissuemanagenet/RiskList" element={<RiskList />} />
        <Route path="/riskissuemanagenet/RiskMatrix" element={<RiskMatrix />} />
        <Route path="/riskissuemanagenet/RiskMitigation" element={<RiskMitigation />} />
        <Route path="/riskissuemanagenet/RiskNavar" element={<RiskNavbar />} />
        <Route path="/riskissuemanagenet/RiskPage" element={<RiskPage />} />
        <Route path="/riskissuemanagenet/RiskReport" element={<RiskReport />} />
        <Route path="/changes" element={<ChangeRequestPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/collaboration" element={<CollaborationPage />} />
        <Route path="/meetings" element={<MeetingPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/ai" element={<AIProjectPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Route>

      {/* Admin Layout Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}