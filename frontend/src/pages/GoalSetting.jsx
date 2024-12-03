import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import GoalSet from '../components/GoalSet';

function GoalSetting() {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [target, setTarget] = useState(3); // Default target: 3 workouts
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/workouts");
        const data = response.data;

        console.log("Fetched workouts data:", data); // Log the data to check its structure

        setWorkouts(data);

        // Count completed and pending workouts based on status
        const completedWorkouts = data.filter((workout) => workout.status === "completed").length;
        const pendingWorkouts = data.filter((workout) => workout.status === "pending").length;

        setCompleted(completedWorkouts);
        setPending(pendingWorkouts);

        // Set the target as the total number of workouts, default to 3 if no workouts are found
        setTarget(Math.max(3, data.length));
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchData();
  }, []);

  // Handle goal submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Goal:", goal, "Deadline:", deadline);
    // Optionally send the goal to the backend
  };

  // Bar Chart Data
  const barChartData = {
    labels: workouts.map((workout) => workout.date),
    datasets: [
      {
        label: "Completed Workouts",
        data: workouts.map((workout) => (workout.status === "completed" ? 1 : 0)),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Pending Workouts",
        data: workouts.map((workout) => (workout.status === "pending" ? 1 : 0)),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  // Line Chart Data (Trend over time)
  const lineChartData = {
    labels: workouts.map((workout) => workout.date),
    datasets: [
      {
        label: "Completed Workouts Trend",
        data: workouts.map((workout) => (workout.status === "completed" ? 1 : 0)),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
      {
        label: "Pending Workouts Trend",
        data: workouts.map((workout) => (workout.status === "pending" ? 1 : 0)),
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
      },
    ],
  };

  // Pie Chart Data (Completion vs Pending)
  const pieChartData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <GoalSet />


      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Weekly Progress</h3>
        <div className="text-gray-700 mb-4">
          <p><strong>Target:</strong> {target} workouts</p>
          <p><strong>Completed:</strong> {completed}</p>
          <p><strong>Pending:</strong> {pending}</p>
        </div>
        <progress className="w-full h-2 mb-2 rounded-lg" value={completed} max={target}></progress>
        <p className="text-center text-gray-600">{((completed / target) * 100).toFixed(1)}% of your target completed</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Workout Progress Bar Chart</h3>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <Bar data={barChartData} />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Workout Progress Line Chart</h3>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <Line data={lineChartData} />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Completion Status (Pie Chart)</h3>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
}

export default GoalSetting;
