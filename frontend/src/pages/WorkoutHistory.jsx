import React, { useState, useEffect } from "react";
import axios from "axios";

const WorkoutHistory = ({ userId }) => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    exercise: "",
    date: "",
    status: "",
    dayNumber: "",
  });

  // Fetch workouts from the backend
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/workouts", {
          params: { userId, status: selectedStatus },
        });
        setWorkouts(response.data);
      } catch (err) {
        console.error("Error fetching workouts", err);
        setError("There was an error fetching the workouts.");
      }
    };

    fetchWorkouts();
  }, [selectedStatus, userId]);

  // Handle status change (Mark as Complete)
  const handleMarkComplete = async (workoutId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/workouts/complete/${workoutId}`
      );

      // Update the workouts list by changing the status to "completed"
      const updatedWorkouts = workouts.map((workout) =>
        workout._id === workoutId
          ? { ...workout, status: "completed" }
          : workout
      );
      setWorkouts(updatedWorkouts);
    } catch (err) {
      console.error("Error marking workout as complete", err);
      setError("There was an error marking the workout as complete.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        // If editing, send a PUT request to update the workout
        const response = await axios.put(
          `http://localhost:5000/api/workouts/${currentId}`,
          formData
        );

        if (response.status === 200) {
          setWorkouts(
            workouts.map((workout) =>
              workout._id === currentId ? { ...workout, ...formData } : workout
            )
          );
          resetForm();
        }
      }
    } catch (err) {
      console.error("Error saving workout", err);
      setError("There was an error saving the workout. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({ exercise: "", date: "", status: "", dayNumber: "" });
    setEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="container mx-auto mt-12 px-6 sm:px-12">
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">Workout History</h2>

      {/* Error Message */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Form to edit workout */}
      {editing && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="exercise"
                value={formData.exercise}
                onChange={handleChange}
                placeholder="Exercise Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="Status"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="number"
                name="dayNumber"
                value={formData.dayNumber}
                onChange={handleChange}
                placeholder="Day Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md mt-6 hover:bg-blue-700 transition duration-300"
          >
            Update Workout
          </button>
        </form>
      )}

      {/* Status Toggle */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setSelectedStatus("pending")}
          className={`${
            selectedStatus === "pending" ? "bg-blue-600 text-white" : "bg-gray-200"
          } px-4 py-2 rounded-l-lg`}
        >
          Pending Workouts
        </button>
        <button
          onClick={() => setSelectedStatus("completed")}
          className={`${
            selectedStatus === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"
          } px-4 py-2 rounded-r-lg`}
        >
          Completed Workouts
        </button>
      </div>

      {/* Workouts List */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <ul className="space-y-4">
          {workouts.length === 0 ? (
            <li className="text-center text-gray-500">No workouts found.</li>
          ) : (
            workouts.map((workout) => (
              <li key={workout._id} className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{workout.exercise}</h3>
                  <p>{workout.date}</p>
                </div>
                {selectedStatus === "pending" && (
                  <button
                    onClick={() => handleMarkComplete(workout._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  >
                    Mark as Complete
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
