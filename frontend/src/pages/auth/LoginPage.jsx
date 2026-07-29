import React, { useState } from "react";
import InputField from "../../components/forms/InputField";
import Checkbox from "../../components/forms/Checkbox";
import Button from "../../components/buttons/Button";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import {useAuth}  from "../../context/AuthContext";
import AuthService from "../../service/AuthService";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    const user = await AuthService.login(email, password);

    login(user);

    switch (user.role) {
      case "PMO ADMIN":
        navigate("/");
        break;

      case "Project Manager":
        navigate("/project-dashboard");
        break;

      case "Team Member":
        navigate("/team-workspace");
        break;

      default:
        navigate("/");
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        {/* PMO Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/assets/pmo-logo.png"
            alt="PMO Logo"
            className="h-16 w-auto"
          />
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold mb-2 text-center">Welcome Back</h2>
        <p className="text-gray-600 mb-6 text-center">
          Please login to continue
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <div className="flex items-center justify-between mt-4">
            <Checkbox
              label="Remember Me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />

            {/* Forgot Password */}
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>
      {error && (
  <p className="text-red-500 text-sm mt-4 text-center">
    {error}s
  </p>
)}
          {/* Login Button */}
          <Button variant="primary" size="md" type="submit" className="w-full mt-6" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
