import React, { useState } from "react";
import InputField from "../../components/forms/InputField";
import Button from "../../components/buttons/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../../context/UserContext";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { getUserById, updateUser } = useUsers();

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

  const fullName = user.name ? user.name.split(" ") : [];

  const [formData, setFormData] = useState({
    firstName: fullName[0] || "",
    lastName: fullName.slice(1).join(" ") || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
    department: user.department || "",
    role: user.role || "",
    status: user.status || "Active",
    tempPassword: "",
    confirmPassword: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser(id, {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      department: formData.department,
      role: formData.role,
      status: formData.status,
    });

    alert("User updated successfully!");

    navigate("/users");
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded shadow">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <InputField
            label="First Name"
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              handleChange("firstName", e.target.value)
            }
          />

          <InputField
            label="Last Name"
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              handleChange("lastName", e.target.value)
            }
          />

          <InputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              handleChange("email", e.target.value)
            }
          />

          <InputField
            label="Phone Number"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) =>
              handleChange("phoneNumber", e.target.value)
            }
          />

          <InputField
            label="Department"
            type="text"
            value={formData.department}
            onChange={(e) =>
              handleChange("department", e.target.value)
            }
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Role
            </label>

            <select
              value={formData.role}
              onChange={(e) =>
                handleChange("role", e.target.value)
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              <option value="HR">HR</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Status
            </label>

            <select
              value={formData.status}
              onChange={(e) =>
                handleChange("status", e.target.value)
              }
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
            onChange={(e) =>
              handleChange("tempPassword", e.target.value)
            }
            placeholder="Enter new temporary password"
          />

          <InputField
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleChange("confirmPassword", e.target.value)
            }
            placeholder="Confirm new password"
          />

          <div className="flex gap-4 mt-6">

            <Button
              variant="primary"
              size="md"
              type="submit"
              className="w-full"
            >
              Save Changes
            </Button>

            <Button
              variant="secondary"
              size="md"
              type="button"
              onClick={handleCancel}
              className="w-full"
            >
              Cancel
            </Button>

          </div>

        </form>
      </div>
    </div>
  );
}