import React, { useState } from "react";
import InputField from "../../components/forms/InputField";
import Button from "../../components/buttons/Button";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <p className="text-gray-600 mb-6 text-center">
          Enter your email to reset your password
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <Button
              variant="primary"
              size="md"
              type="submit"
              className="w-full mt-6"
            >
              Send Reset Link
            </Button>
          </form>
        ) : (
          <div className="text-green-600 font-medium text-center">
            If this email exists, a reset link has been sent.
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
