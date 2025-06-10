// ✅ Updated ChatWidget.jsx with Gemini-based Flask backend support
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMicrophone,
  FaPaperPlane,
  FaFileUpload,
  FaCommentDots,
  FaTimes
} from "react-icons/fa";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to SahyogBot! How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const chatRef = useRef(null);
  const recognitionRef = useRef(null);

  // 🎙️ Voice recognition setup
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev + " " + transcript);
      };

      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const toggleSpeech = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  // ✉️ Send message to Gemini-powered Flask backend
  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input })
      });

      const data = await res.json();
      const botText = data.response || "❌ Sorry, I couldn't understand that.";
      setMessages((prev) => [...prev, { text: botText, sender: "bot" }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "❌ API Error: Failed to fetch response.", sender: "bot" }
      ]);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setMessages((prev) => [
        ...prev,
        { text: `📄 File "${file.name}" uploaded`, sender: "user" }
      ]);
      // You can integrate backend upload here if needed
    };
    reader.readAsText(file);
  };

  // 📜 Auto-scroll to latest message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition"
        >
          <FaCommentDots size={24} />
        </button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="w-[90vw] sm:w-[24rem] h-[70vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 flex justify-between items-center">
              <h2 className="font-bold text-lg">SahyogBot</h2>
              <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
                <FaTimes />
              </button>
            </div>

            {/* Chat messages */}
            <div ref={chatRef} className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-lg text-sm ${
                      msg.sender === "user"
                        ? "bg-indigo-100 text-indigo-900"
                        : "bg-indigo-600 text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input & Controls */}
            <div className="border-t px-3 py-3 bg-white flex items-center gap-2">
              <label className="cursor-pointer text-gray-500 hover:text-indigo-500">
                <FaFileUpload />
                <input type="file" hidden onChange={handleFileUpload} />
              </label>

              <button
                onClick={toggleSpeech}
                className={`p-2 rounded-full transition ${
                  isListening ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                <FaMicrophone />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                onClick={handleSend}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg"
              >
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatWidget;
