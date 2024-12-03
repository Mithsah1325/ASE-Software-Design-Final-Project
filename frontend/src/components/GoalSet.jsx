import React, { useState, useEffect } from "react";
import axios from "axios";

function GoalSet() {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [userEmail, setUserEmail] = useState(""); // Assuming the email is available
  const [savedGoal, setSavedGoal] = useState(null);

  // Fetch saved goal on component load
  useEffect(() => {
    const fetchSavedGoal = async () => {
      try {
        if (userEmail) {
          const response = await axios.get("http://localhost:5000/api/goals", {
            params: { email: userEmail }
          });
          setSavedGoal(response.data);
        }
      } catch (error) {
        console.error("Error fetching saved goal:", error);
      }
    };

    fetchSavedGoal();
  }, [userEmail]); // Run this effect when the email changes

  // Handle goal submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/goals", {
        goal,
        deadline,
        email: userEmail, // Pass the email with the goal
      });
      // After successful goal submission, fetch the saved goal again
      setSavedGoal({ goal, deadline });
      setGoal(""); // Clear input fields
      setDeadline(""); // Clear input fields
    } catch (error) {
      console.error("Error saving goal:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Goal Setting</h2>

      <form className="flex flex-col items-center mb-6" onSubmit={handleSubmit}>
        <div className="flex gap-4 mb-4">
          <input
            type="email"
            placeholder="Your Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="px-4 py-2 w-60 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="text"
            placeholder="Your Fitness Goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="px-4 py-2 w-60 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="px-4 py-2 w-60 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition duration-300"
        >
          Submit Goal
        </button>
      </form>

      {savedGoal && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Your Saved Goal</h3>
          <p><strong>Goal:</strong> {savedGoal.goal}</p>
          <p><strong>Deadline:</strong> {savedGoal.deadline}</p>
        </div>
      )}
    </div>
  );
}

export default GoalSet;
