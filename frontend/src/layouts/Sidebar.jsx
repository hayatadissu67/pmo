import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-blue-700">
        Project Manager
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link to="/users" className="block p-2 rounded hover:bg-blue-700">Users</Link>
        <Link to="/tasks" className="block p-2 rounded hover:bg-blue-700">Tasks</Link>
        <Link to="/resources" className="block p-2 rounded hover:bg-blue-700">Resources</Link>
        <Link to="/risks" className="block p-2 rounded hover:bg-blue-700">Risks</Link>
        <Link to="/changes" className="block p-2 rounded hover:bg-blue-700">Change Requests</Link>
        <Link to="/budget" className="block p-2 rounded hover:bg-blue-700">Budget</Link>
        <Link to="/collaboration" className="block p-2 rounded hover:bg-blue-700">Collaboration</Link>
        <Link to="/meetings" className="block p-2 rounded hover:bg-blue-700">Meetings</Link>
        <Link to="/reports" className="block p-2 rounded hover:bg-blue-700">Reports</Link>
        <Link to="/ai" className="block p-2 rounded hover:bg-blue-700">AI Project</Link>
        <Link to="/notifications" className="block p-2 rounded hover:bg-blue-700">Notifications</Link>
        <Link to="/admin" className="block p-2 rounded hover:bg-blue-700">Admin</Link>
      </nav>
    </aside>
  );
}
