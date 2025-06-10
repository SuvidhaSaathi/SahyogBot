import React, { useState, useRef } from "react";

// Check browser compatibility
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

function VoiceAccess() {
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "🎤 Tap the mic and start speaking..." }
  ]);
  const synthRef = useRef(window.speechSynthesis);

  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    synthRef.current.cancel(); // cancel previous speech
    synthRef.current.speak(utter);
  };

  const handleVoiceInput = () => {
    if (!recognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setListening(true);
    setMessages((prev) => [...prev, { from: "system", text: "🎧 Listening..." }]);

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setMessages((prev) => [...prev, { from: "user", text: transcript }]);
      setListening(false);

      try {
        // 🔧 Replace this with your actual chatbot API call
        const response = await fetch("https://your-api.com/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: transcript })
        });

        const data = await response.json();
        const botReply = data.reply || "Sorry, I didn't get that.";

        setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
        speak(botReply);
      } catch (error) {
        console.error(error);
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "⚠️ Failed to reach chatbot. Try again." }
        ]);
        speak("Sorry, there was an error. Please try again.");
      }
    };

    recognition.onerror = (e) => {
      console.error(e);
      setListening(false);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Voice recognition error. Please try again." }
      ]);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-8">
      <h3 className="text-xl font-semibold mb-4 text-indigo-700">🎙️ Voice & Accessibility</h3>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <button
          onClick={handleVoiceInput}
          className={`px-5 py-3 rounded-lg font-medium flex items-center gap-2 text-white transition shadow ${
            listening ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          <span>{listening ? "🛑 Stop" : "🎤 Start Voice Input"}</span>
        </button>
        <span className="text-gray-600 text-sm sm:text-base">
          {listening ? "Listening..." : "Tap the mic to speak your query."}
        </span>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm sm:text-base p-2 rounded-lg ${
              msg.from === "bot"
                ? "bg-indigo-100 text-indigo-800 self-start"
                : msg.from === "user"
                ? "bg-green-100 text-green-800 self-end text-right"
                : "text-gray-500 italic"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-gray-600 text-sm mb-2">
          Designed for rural kiosks with large, high-contrast controls.
        </p>
        <button className="bg-indigo-700 text-white px-6 py-4 text-lg rounded-xl w-full sm:w-auto shadow-md hover:bg-indigo-800 transition">
          ⬆️ Large Button Example
        </button>
      </div>
    </div>
  );
}

export default VoiceAccess;
