import { motion } from "framer-motion";

const features = [
  { icon: "🔍", title: "Scheme Discovery", desc: "Find all schemes you qualify for" },
  { icon: "💡", title: "Personalized Guidance", desc: "Tailored advice for your needs" },
  { icon: "📝", title: "Form Assistance", desc: "Help filling out applications" },
  { icon: "⏰", title: "Deadline Alerts", desc: "Never miss an application deadline" },
  { icon: "🎤", title: "Voice & Kiosk Access", desc: "Use your voice or visit a kiosk" },
  { icon: "👩", title: "Women-Focused Support", desc: "Special help for women" },
];

function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="py-6 sm:py-8">
      <h2 className="text-2xl font-bold text-center mb-6 sm:mb-8">Key Features</h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 sm:p-6 rounded-lg shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200"
            variants={item}
            whileHover={{ scale: 1.03 }}
          >
            <span className="text-3xl mb-2 sm:mb-3">{feature.icon}</span>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.section
        className="bg-gradient-to-r from-blue-600 rounded-xl opacity-5 to-indigo-800 text-white py-16 px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Discover Your Best Schemes</h1>
        <p className="text-xl sm:text-2xl mb-8">Find, apply, and manage government and private schemes tailored for you.</p>
       
      </motion.section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Features />
        {/* Add How It Works, Testimonials, FAQ, Contact sections here */}
      </div>
    </div>
  );
}
