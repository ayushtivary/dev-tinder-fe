import { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/notification/progress";

export default function NotificationProgress() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(API_URL);
        const newProgress = res.data.progress;

        setProgress(newProgress);
        setLoading(false);

        // ✅ Stop polling immediately when progress reaches 100
        if (newProgress >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      } catch {
        setError("Failed to fetch progress");
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    };

    // First fetch
    fetchProgress();

    // Start polling
    intervalRef.current = setInterval(fetchProgress, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const getProgressColor = () => {
    if (progress < 40) return "#ef4444"; // red
    if (progress < 80) return "#f59e0b"; // amber
    return "#22c55e"; // green
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md text-center border border-gray-700">
        <h2 className="text-white text-2xl font-bold mb-6">
          Notification Progress
        </h2>

        {/* Smooth progress bar */}
        <div className="w-full h-6 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-1000 ease-in-out"
            style={{
              width: `${progress}%`,
              backgroundColor: getProgressColor(),
            }}
          />
        </div>

        <div
          className={`mt-4 text-lg font-semibold ${
            progress < 100 ? "text-gray-300" : "text-green-400 animate-pulse"
          }`}
        >
          {progress < 100
            ? `Progress: ${progress}%`
            : "✅ All notifications processed!"}
        </div>

        {loading && (
          <div className="text-gray-400 mt-2 text-sm italic">
            Fetching progress...
          </div>
        )}

        {error && <div className="text-red-400 mt-3">{error}</div>}
      </div>
    </div>
  );
}
