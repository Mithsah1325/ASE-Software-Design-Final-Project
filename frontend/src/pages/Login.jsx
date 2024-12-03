import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loginWithGoogle } = useAuth(); // Destructure loginWithGoogle
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/workout-manager"); // Redirect to workout manager after login
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle(); // Trigger Google login
      navigate("/workout-manager"); // Redirect to workout manager after successful login
    } catch (err) {
      setError("Failed to login with Google. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
        {/* Google Login Button */}
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.2 0 6.1 1.2 8.4 3.1l6.3-6.3C34.4 3.1 29.5 1 24 1 14.6 1 6.4 6.8 2.6 14.5l7.4 5.7C12.5 14.4 17.8 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.1 24.5c0-1.8-.2-3.6-.6-5.3H24v10.1h12.5c-.5 2.7-2 5.1-4.1 6.8v5.6h6.6c3.8-3.5 6.1-8.7 6.1-14.7z"
              />
              <path
                fill="#FBBC05"
                d="M10 27.3c-.6-1.8-1-3.7-1-5.8s.4-4 1-5.8v-5.7H2.6C1 13.3 0 16.6 0 20s1 6.7 2.6 9.2l7.4-5.9z"
              />
              <path
                fill="#34A853"
                d="M24 47c6.5 0 12.1-2.1 16.1-5.8l-7.4-5.9c-2.3 1.5-5.2 2.4-8.7 2.4-6.2 0-11.5-4.1-13.5-9.8l-7.5 5.8c3.7 7.6 11.7 13.3 21 13.3z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            Login with Google
          </button>
        </div>
        {/* Register Link */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
