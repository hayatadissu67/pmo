import {  Routes, Route, Navigate } from "react-router-dom";

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
import CollaborationPage from "../pages/collaboration/CollaborationPage";
import MeetingPage from "../pages/meetingManagement/MeetingPage";
import ReportsPage from "../pages/reports/ReportsPage";
import AIProjectPage from "../pages/aiProject/AIProjectPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import AdminPage from "../pages/systemAdmin/AdminPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import UnauthorizedPage from "../pages/auth/UnauthorizedPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AddUser from "../pages/userManagement/AddUser";
import EditUser from "../pages/userManagement/EditUser";
import UserDetails from "../pages/userManagement/UserDetails";
import UserProfile from "../pages/userManagement/UserProfile";
import AssignRole from "../pages/userManagement/AssignRole";
import ProtectedRoute from "../pages/auth/ProtectedRoute";

export default function AppRoutes() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forget" element={<ForgotPasswordPage />} />
          <Route path="/forbid" element={<UnauthorizedPage />} />
        </Route>

       <Route
 element={
   <ProtectedRoute
     allowedRoles={[
       "PMO ADMIN",
       "PROJECT_MANAGER",
       "TEAM_MEMBER",
       "INTERN"
     ]}
   >
     <DashboardLayout />
   </ProtectedRoute>
 }
>
          <Route path="/" element={<ProjectDashboard />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/addusers" element={<AddUser />} />
          <Route path="/editUsers/:id" element={<EditUser />} />
          <Route path="/detailUsers/:id" element={<UserDetails />} />
          <Route path="/Usersprofile" element={<UserProfile />} />
          <Route path="/AssignRole/:id" element={<AssignRole />} />
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

        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/adminpage" element={<ProjectDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}
