import {Outlet} from "react-router-dom";
export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <Outlet/>
      </div>
    </div>
  );
}
