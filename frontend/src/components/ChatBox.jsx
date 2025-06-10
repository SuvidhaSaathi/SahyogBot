import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrophone, FaPaperPlane, FaFileUpload } from "react-icons/fa";

function ChatBox() {
  const [messages, setMessages] = useState([
    { text: "Welcome to SahyogBot! How can I assist you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const chatAreaRef = useRef(null);
  const recognitionRef = useRef(null);

  // Voice Recognition Setup
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

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleSpeechInput = () => {
    if (recognitionRef.current) {
      if (!isListening) {
        setIsListening(true);
        recognitionRef.current.start();
      } else {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  };

  const handleSend = async () => {
    if (input.trim() === "") return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input })
      });
      const data = await res.json();
      const botReply = { text: data.answer || "Sorry, I couldn't process that.", sender: "bot" };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "API Error", sender: "bot" }]);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result;
      setMessages((prev) => [...prev, { text: `Uploaded file: ${file.name}`, sender: "user" }]);
      // TODO: Send file content to backend
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">💬 Chat with SahyogBot</h2>
      </div>

      <div ref={chatAreaRef} className="h-[60vh] p-4 overflow-y-auto bg-gray-50 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  message.sender === "user"
                    ? "bg-indigo-100 text-indigo-900"
                    : "bg-indigo-600 text-white"
                }`}
              >
                {message.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex items-center border-t border-gray-300 bg-white px-4 py-3 gap-2">
        <label className="cursor-pointer text-gray-600 hover:text-indigo-500">
          <FaFileUpload size={18} />
          <input type="file" hidden onChange={handleFileUpload} />
        </label>

        <button
          onClick={toggleSpeechInput}
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
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />

        <button
          onClick={handleSend}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
