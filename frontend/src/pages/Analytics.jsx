import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import * as XLSX from "xlsx";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Analytics() {
  const [workouts, setWorkouts] = useState([]);
  const [workoutStats, setWorkoutStats] = useState({ typeStats: {}, progressData: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch workouts data from the server
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/workouts"); // Update endpoint as needed
        setWorkouts(response.data);
        processData(response.data);
      } catch (error) {
        setError("Error fetching workouts data. Please try again.");
        console.error("Error fetching workouts data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (workouts.length === 0) {  // Avoid re-fetching if data is already fetched
      fetchWorkouts();
    }
  }, [workouts]);

  // Process data to calculate statistics and progress
  const processData = (data) => {
    const typeStats = {};
    const progressData = [];

    data.forEach((workout) => {
      // Count workout types
      if (typeStats[workout.exercise]) {
        typeStats[workout.exercise] += 1;
      } else {
        typeStats[workout.exercise] = 1;
      }

      // Collect progress data for charting (assuming 'dayNumber' or similar for progress tracking)
      progressData.push({
        day: workout.dayNumber,
        progress: workout.status === "completed" ? 1 : 0, // Adjust based on actual progress tracking
      });
    });

    setWorkoutStats({ typeStats, progressData });
  };

  // Chart data for progress visualization (e.g., number of workouts completed per day)
  const progressChartData = {
    labels: workoutStats.progressData.map((entry) => `Day ${entry.day}`),
    datasets: [
      {
        label: "Workout Progress",
        data: workoutStats.progressData.map((entry) => entry.progress),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  // Handle exporting data to CSV/Excel
  const handleExportData = () => {
    const ws = XLSX.utils.json_to_sheet(workouts); // Convert JSON to Excel sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Workouts");
    XLSX.writeFile(wb, "workouts_data.xlsx");
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Fitness Analytics</h2>

      {/* Progress Chart */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Workout Progress</h3>
        <Line data={progressChartData} />
      </div>

      {/* Workout Statistics (Preferred workout types) */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Preferred Workout Types</h3>
        <ul className="list-disc pl-6">
          {Object.entries(workoutStats.typeStats).map(([type, count]) => (
            <li key={type}>
              {type}: {count} workouts
            </li>
          ))}
        </ul>
      </div>

      {/* Export Button */}
      <div className="text-center">
        <button
          onClick={handleExportData}
          className="px-6 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition duration-300"
        >
          Export Workout Data
        </button>
      </div>

      {/* Goal Section (Optional) */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Fitness Goal</h3>
        {/* Here you can add a goal setting component */}
        <div className="bg-teal-100 p-4 rounded-lg">
          <p className="text-gray-800">Set and track your fitness goals with ease!</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
