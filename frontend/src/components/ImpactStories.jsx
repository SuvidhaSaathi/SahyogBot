import React from "react";
import { motion } from "framer-motion";

const stories = [
  { name: "Priya", story: "Got a scholarship for her studies", avatar: "👧" },
  { name: "Ramesh", story: "Found a health scheme for his family", avatar: "👨" },
  { name: "Meena", story: "Started a business with a women's grant", avatar: "👩" },
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

export default function ImpactStories() {
  return (
    <section className="relative py-10 sm:py-14 bg-gradient-to-b from-white to-slate-50">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800">🌟 Impact Stories</h2>
        <p className="text-gray-600 mt-2 text-base sm:text-lg">
          Real people. Real change. Thanks to the right scheme.
        </p>
      </motion.div>

      <div className="overflow-x-auto scrollbar-hide px-4">
        <div className="flex gap-6 snap-x snap-mandatory px-2 sm:px-8">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              className="snap-center flex-shrink-0 bg-white border border-gray-200 rounded-2xl shadow-md p-5 sm:p-6 w-64 transition-all duration-300 hover:shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-3">{story.avatar}</div>
              <h3 className="text-lg font-bold text-indigo-700">{story.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{story.story}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-full text-base font-medium hover:bg-indigo-700 transition shadow">
          Share Your Story 📢
        </button>
      </div>
    </section>
  );
}
