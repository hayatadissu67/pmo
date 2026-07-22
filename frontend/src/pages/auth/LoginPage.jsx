import React, { useState } from "react";
import InputField from "../../components/forms/InputField";
import Checkbox from "../../components/forms/Checkbox";
import Button from "../../components/buttons/Button";
import { useAppContext } from "../../context/AppContext";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
const { login } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
    login({ email, password });

  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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

          <Checkbox
            label="Remember Me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />

          <Button variant="primary" size="md" type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
