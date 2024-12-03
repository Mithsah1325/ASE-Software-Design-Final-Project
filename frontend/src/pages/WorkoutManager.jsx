import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const WorkoutManager = () => {
  const [workouts, setWorkouts] = useState([]);
  const [formData, setFormData] = useState({
    exercise: "",
    date: "",
    status: "",
    dayNumber: "",
  });
  const [error, setError] = useState({});
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newError = {};
    if (!formData.exercise) newError.exercise = "Exercise name is required.";
    if (!formData.date) newError.date = "Date is required.";
    if (!formData.status) newError.status = "Status is required.";
    if (!formData.dayNumber || formData.dayNumber <= 0)
      newError.dayNumber = "Day number must be a positive number.";
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const resetForm = () => {
    setFormData({ exercise: "", date: "", status: "", dayNumber: "" });
    setEditing(false);
    setCurrentId(null);
    setError({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editing) {
        const response = await axios.put(
          `http://localhost:5000/api/workouts/${currentId}`,
          formData
        );
        if (response.status === 200) {
          setWorkouts((prevWorkouts) =>
            prevWorkouts.map((workout) =>
              workout._id === currentId ? { ...workout, ...formData } : workout
            )
          );
          resetForm();
        }
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/workouts",
          formData
        );
        if (response.status === 201) {
          setWorkouts((prevWorkouts) => [...prevWorkouts, response.data]);
          resetForm();
        }
      }
    } catch (err) {
      console.error("Error saving workout:", err);
      setError({ global: "Error saving workout. Please try again." });
    }
  };

  const handleEdit = (workout) => {
    setFormData({
      exercise: workout.exercise,
      date: workout.date.split("T")[0], // Ensure proper format for input[type="date"]
      status: workout.status,
      dayNumber: workout.dayNumber,
    });
    setEditing(true);
    setCurrentId(workout._id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this workout?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/workouts/${id}`
      );
      if (response.status === 200) {
        setWorkouts((prevWorkouts) =>
          prevWorkouts.filter((workout) => workout._id !== id)
        );
      }
    } catch (err) {
      console.error("Error deleting workout:", err);
      setError({ global: "Error deleting workout. Please try again." });
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

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="exercise"
              value={formData.exercise}
              onChange={handleChange}
              placeholder="Exercise Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Exercise name"
            />
            {error.exercise && (
              <p className="text-red-500 text-sm">{error.exercise}</p>
            )}
          </div>
          <div>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Date"
            />
            {error.date && <p className="text-red-500 text-sm">{error.date}</p>}
          </div>
          <div>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="Status"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Status"
            />
            {error.status && (
              <p className="text-red-500 text-sm">{error.status}</p>
            )}
          </div>
          <div>
            <input
              type="number"
              name="dayNumber"
              value={formData.dayNumber}
              onChange={handleChange}
              placeholder="Day Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Day Number"
            />
            {error.dayNumber && (
              <p className="text-red-500 text-sm">{error.dayNumber}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md mt-6 hover:bg-blue-700 transition duration-300"
        >
          {editing ? "Update Workout" : "Save Workout"}
        </button>
      </form>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          <Link to="/workout-history">Workout History</Link> 
        </h3>
        <ul className="space-y-4">
          {workouts.length === 0 ? (
            <li className="text-center text-gray-500">
              No workouts saved yet. Add one!
            </li>
          ) : (
            workouts.map((workout) => (
              <li
                key={workout._id}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300"
              >
                <p className="text-lg font-semibold text-gray-700">
                  {`${workout.exercise} - Day ${workout.dayNumber}`}
                </p>
                <p className="text-sm text-gray-600">{`Status: ${workout.status}`}</p>
                <p className="text-sm text-gray-600">{`Date: ${new Date(
                  workout.date
                ).toLocaleDateString()}`}</p>
                <div className="flex mt-2 space-x-4">
                  <button
                    onClick={() => handleEdit(workout)}
                    className="text-blue-500 hover:underline"
                    aria-label="Edit workout"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(workout._id)}
                    className="text-red-500 hover:underline"
                    aria-label="Delete workout"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default WorkoutManager;
