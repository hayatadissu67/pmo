import React from "react";
import Button from "../../components/buttons/Button";

export default function UserProfile({ user }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-8 rounded shadow">
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src={user?.avatar || "/assets/default-avatar.png"}
            alt={user?.name}
            className="w-24 h-24 rounded-full border"
          />
        </div>

        {/* Personal Information */}
        <h2 className="text-2xl font-bold text-center mb-4">
          {user?.name || "User Name"}
        </h2>

        {/* Contact Information */}
        <div className="space-y-3 text-gray-700">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Phone:</strong> {user?.phoneNumber}</p>
        </div>

        {/* Department & Role */}
        <div className="space-y-3 text-gray-700 mt-4">
          <p><strong>Department:</strong> {user?.department}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>

        {/* Account Status */}
        <div className="mt-4">
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded text-sm ${
                user?.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user?.status}
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <Button variant="primary" size="md" className="w-full">
            Edit Profile
          </Button>
          <Button variant="secondary" size="md" className="w-full">
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
}
