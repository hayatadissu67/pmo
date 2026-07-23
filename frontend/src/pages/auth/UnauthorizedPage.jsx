import React from "react";
import { Lock } from "lucide-react"; // using lucide-react for icons
import Button from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/dashboard"); // adjust route as needed
  };

  const handleLogout = () => {
    // For now, just redirect to login
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow text-center">
        {/* Lock/Warning Icon */}
        <div className="flex justify-center mb-4">
          <Lock className="w-12 h-12 text-red-500" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>

        {/* Explanation Message */}
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={handleBackToDashboard}
            className="w-full"
          >
            Back to Dashboard
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={handleLogout}
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
