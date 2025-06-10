import React, { useEffect, useState } from "react";
import SchemeCard from "../components/SchemeCard";
import axios from "axios";
import { motion } from "framer-motion";
import { RocketIcon } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 }
};

export default function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await axios.get("https://your-api-url.com/schemes"); // 🔗 Replace with your real endpoint
        setSchemes(res.data);
      } catch (err) {
        setError("Failed to fetch schemes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-10"
          {...fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 mb-2 text-indigo-600 font-semibold">
            <RocketIcon className="w-5 h-5" />
            Curated for You
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            🎯 Recommended Government Schemes
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-2">
            Explore schemes tailored to your profile. Apply with one click.
          </p>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-500">⏳ Loading schemes...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemes.map((scheme, index) => (
              <motion.div
                key={scheme.id}
                {...fadeInUp}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <SchemeCard {...scheme} />
              </motion.div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-12 text-center">
            <button className="bg-indigo-600 text-white text-lg px-6 py-3 rounded-full hover:bg-indigo-700 transition-all shadow-md">
              📄 View All Schemes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
