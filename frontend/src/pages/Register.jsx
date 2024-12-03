import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, createUserWithEmailAndPassword, setDoc, doc } from "../firebase/firebaseConfig.js"; 

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when registering
    setError(""); // Clear previous errors

    // Basic validation before making the Firebase request
    if (!formData.email || !formData.password) {
      setError("Both email and password are required.");
      setLoading(false);
      return;
    }

    try {
      // Register user with Firebase (without logging in)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Get the user information
      const user = userCredential.user;

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: formData.email,
        createdAt: new Date(),
      });

      // Clear form fields
      setFormData({ email: "", password: "" });

      // Show success alert
      alert("Registration successful! Please log in.");

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err); // Log the error
      setError(err.message || "Registration failed. Please try again."); // Display error message
    } finally {
      setLoading(false); // Set loading to false after process
    }
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="max-w-sm mx-auto">
        {error && <p className="text-red-600 mb-4">{error}</p>} {/* Display error if any */}

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="px-4 py-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="px-4 py-2 border rounded w-full"
            required
            minLength="6"
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
