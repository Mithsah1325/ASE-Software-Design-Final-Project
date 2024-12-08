import React, { useState, useEffect } from "react";
import axios from "axios";

const GoalSet = () => {
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    fitnessGoal: "",
    date: "",
  });
  const [error, setError] = useState({});
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/goals");
        setGoals(response.data);
      } catch (err) {
        console.error("Error fetching goals:", err);
      }
    };
    fetchGoals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newError = {};
    if (!formData.email) newError.email = "Email is required.";
    if (!formData.fitnessGoal) newError.fitnessGoal = "Goal is required.";
    if (!formData.date) newError.date = "Date is required.";
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const resetForm = () => {
    setFormData({ email: "", fitnessGoal: "", date: "" });
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
          `http://localhost:5000/api/goals/${currentId}`,
          formData
        );
        if (response.status === 200) {
          setGoals((prevGoals) =>
            prevGoals.map((goal) =>
              goal._id === currentId ? { ...goal, ...formData } : goal
            )
          );
          resetForm();
        }
      } else {
        const response = await axios.post("http://localhost:5000/api/goals", formData);
        if (response.status === 201) {
          setGoals((prevGoals) => [...prevGoals, response.data]);
          resetForm();
        }
      }
    } catch (err) {
      console.error("Error saving goal:", err);
    }
  };

  const handleEdit = (goal) => {
    setFormData({
      email: goal.email,
      fitnessGoal: goal.fitnessGoal,
      date: goal.date.split("T")[0],
    });
    setEditing(true);
    setCurrentId(goal._id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this goal?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/goals/${id}`);
      if (response.status === 200) {
        setGoals((prevGoals) => prevGoals.filter((goal) => goal._id !== id));
      }
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  return (
    <div className="container mx-auto mt-12 px-6 sm:px-12">
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        Goal Manager
      </h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              aria-label="Email"
            />
            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
          </div>
          <div>
            <input
              type="text"
              name="fitnessGoal"
              value={formData.fitnessGoal}
              onChange={handleChange}
              placeholder="Fitness Goal"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              aria-label="Fitness Goal"
            />
            {error.fitnessGoal && <p className="text-red-500 text-sm">{error.fitnessGoal}</p>}
          </div>
          <div>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              aria-label="Date"
            />
            {error.date && <p className="text-red-500 text-sm">{error.date}</p>}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-blue-700"
        >
          {editing ? "Update Goal" : "Save Goal"}
        </button>
      </form>

      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md rounded-lg p-6 max-w-3xl mx-auto mb-8">
  <h3 className="text-3xl font-semibold text-white text-center mb-6">Your Next Goal</h3>
  <div className="flex justify-center items-center">
    {goals.length === 0 ? (
      <p className="text-center text-white text-xl">No goals set yet. Add one to get started!</p>
    ) : (
      goals.slice(0, 1).map((goal) => (
        <div key={goal._id} className="w-full bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <p className="text-2xl font-semibold text-gray-800 mb-2">{goal.fitnessGoal}</p>
          <p className="text-lg text-gray-600 mb-4">Target Date: {new Date(goal.date).toLocaleDateString()}</p>
          <div className="flex justify-between items-center">
            <button
              onClick={() => handleEdit(goal)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full transition duration-300 ease-in-out"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(goal._id)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full transition duration-300 ease-in-out"
            >
              Delete
            </button>
          </div>
        </div>
      ))
    )}
  </div>
</div>

    </div>
  );
};

export default GoalSet;
