import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);
  const [toggleStatus, setToggleStatus] = useState("pending"); // State for toggle
  const [error, setError] = useState({});

  useEffect(() => {
    // Fetch workouts from the API
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/workouts");
        setWorkouts(response.data);
      } catch (err) {
        console.error("Error fetching workouts:", err);
        setError({ global: "Unable to fetch workouts. Please try again later." });
      }
    };
    fetchWorkouts();
  }, []);

  // Handle toggle change
  const handleToggle = (status) => {
    setToggleStatus(status);
  };

  // Filter workouts based on the status
  const filteredWorkouts = workouts.filter((workout) =>
    toggleStatus === "pending" ? workout.status === "pending" : workout.status === "completed"
  );

  // Mark workout as completed
  const markAsCompleted = async (workoutId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/workouts/${workoutId}`, {
        status: "completed",
      });
      // After updating, fetch the latest workouts
      const updatedWorkouts = workouts.map((workout) =>
        workout._id === workoutId ? { ...workout, status: "completed" } : workout
      );
      setWorkouts(updatedWorkouts);
    } catch (err) {
      console.error("Error updating workout status:", err);
      setError({ global: "Unable to update workout. Please try again later." });
    }
  };

  return (
    <div className="container mx-auto mt-12 px-6 sm:px-12">
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        Workout Manager
      </h2>

      {error.global && (
        <div className="text-red-500 text-center mb-4">{error.global}</div>
      )}

      {/* Toggle Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => handleToggle("pending")}
          className={`px-6 py-2 rounded-lg text-white ${toggleStatus === "pending" ? "bg-blue-600" : "bg-gray-400"} hover:bg-blue-700 transition duration-300`}
        >
          Pending Workouts
        </button>
        <button
          onClick={() => handleToggle("completed")}
          className={`px-6 py-2 rounded-lg text-white ${toggleStatus === "completed" ? "bg-blue-600" : "bg-gray-400"} hover:bg-blue-700 transition duration-300`}
        >
          Completed Workouts
        </button>
      </div>

      {/* Display filtered workouts based on toggle */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          {toggleStatus === "pending" ? "Pending Workouts" : "Completed Workouts"}
        </h3>
        <ul className="space-y-4">
          {filteredWorkouts.length === 0 ? (
            <li className="text-center text-gray-500">No workouts to show. Add some!</li>
          ) : (
            filteredWorkouts.map((workout) => (
              <li
                key={workout._id}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300"
              >
                <p className="text-lg font-semibold text-gray-700">
                  {`${workout.exercise} - Day ${workout.dayNumber}`}
                </p>
                <p className="text-sm text-gray-600">{`Status: ${workout.status}`}</p>
                <p className="text-sm text-gray-600">{`Date: ${new Date(workout.date).toLocaleDateString()}`}</p>

                {/* Only show the button for pending workouts */}
                {workout.status === "pending" && (
                  <button
                    onClick={() => markAsCompleted(workout._id)}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    Mark as Completed
                  </button>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default WorkoutHistory;
