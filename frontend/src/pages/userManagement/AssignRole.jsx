import React, { useState } from "react";
import Button from "../../components/buttons/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../../context/UserContext";

export default function AssignRole() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { getUserById, assignRole } = useUsers();

  const user = getUserById(id);

  const [selectedRole, setSelectedRole] = useState(user?.role || "");

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-600">
          User not found
        </h2>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    assignRole(id, selectedRole);

    alert("Role assigned successfully!");

    navigate("/users");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded shadow">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Assign Role
        </h2>

        <div className="mb-6 p-4 rounded bg-gray-50">

          <p>
            <strong>Name:</strong> {user.name}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Current Role:</strong> {user.role}
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium mb-1">
              Select New Role
            </label>

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Choose a role</option>

              <option value="PMO Administrator">PMO Administrator</option>
              <option value="Executive">Executive</option>
              <option value="Project Sponsor">Project Sponsor</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Team Member">Team Member</option>
              <option value="Reviewer">Reviewer</option>
              <option value="Document Controller">Document Controller</option>
              <option value="Risk Manager">Risk Manager</option>
              <option value="Quality Assurance">Quality Assurance</option>
              <option value="Client">Client</option>
              <option value="Intern">Intern</option>

            </select>
          </div>

          <div className="flex gap-4">

            <Button
              variant="primary"
              size="md"
              type="submit"
              className="w-full"
            >
              Assign Role
            </Button>

            <Button
              variant="secondary"
              size="md"
              type="button"
              className="w-full"
              onClick={() => navigate("/users")}
            >
              Cancel
            </Button>

          </div>

        </form>
      </div>
    </div>
  );
}