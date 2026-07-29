import React, { useState } from "react";
import InputField from "../../components/forms/InputField";
import Button from "../../components/buttons/Button";
import { useUsers } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
export default function AddUser() {
    const {addUser} = useUsers();
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    department: "",
    role: "",
    status: "Active",
    tempPassword: "",
    confirmPassword: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // Optional validation
  if (
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.role
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  addUser({
    name: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    department: formData.department,
    role: formData.role,
    status: formData.status,
    avatar: "/assets/default-avatar.png",
    phoneNumber: formData.phoneNumber,
  });

  navigate("/users");
};
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="First Name"
            type="text"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="Enter first name"
          />

          <InputField
            label="Last Name"
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Enter last name"
          />

          <InputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Enter email"
          />

          <InputField
            label="Phone Number"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            placeholder="Enter phone number"
          />

          <InputField
            label="Department"
            type="text"
            value={formData.department}
            onChange={(e) => handleChange("department", e.target.value)}
            placeholder="Enter department"
          />

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              <option value="HR">HR</option>
            </select>
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <InputField
            label="Temporary Password"
            type="password"
            value={formData.tempPassword}
            onChange={(e) => handleChange("tempPassword", e.target.value)}
            placeholder="Enter temporary password"
          />

          <InputField
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            placeholder="Confirm password"
          />

          <Button variant="primary" size="md" type="submit" className="w-full mt-4">
            Create User
          </Button>
        </form>
      </div>
    </div>
  );
}
