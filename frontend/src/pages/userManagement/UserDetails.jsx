import React from "react";
import Button from "../../components/buttons/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../../context/UserContext";

export default function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getUserById } = useUsers();

  const user = getUserById(id);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-600">
          User not found
        </h2>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/editUsers/${user.id}`);
  };

  const handleBack = () => {
    navigate("/users");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-8 rounded shadow">

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src={user.avatar || "/assets/default-avatar.png"}
            alt={user.name}
            className="w-24 h-24 rounded-full border"
          />
        </div>

        {/* User Information */}
        <h2 className="text-2xl font-bold text-center mb-4">
          {user.name}
        </h2>

        <div className="space-y-3 text-gray-700">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phoneNumber}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Role:</strong> {user.role}</p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded text-sm ${
                user.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.status}
            </span>
          </p>

          <p>
            <strong>Created Date:</strong>{" "}
            {user.createdDate || "Not Available"}
          </p>

          <p>
            <strong>Assigned Projects:</strong>{" "}
            {user.projects?.length
              ? user.projects.join(", ")
              : "None"}
          </p>

          <p>
            <strong>Last Login:</strong>{" "}
            {user.lastLogin || "Never"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            variant="primary"
            size="md"
            onClick={handleEdit}
            className="w-full"
          >
            Edit User
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={handleBack}
            className="w-full"
          >
            Back
          </Button>
        </div>

      </div>
    </div>
  );
}