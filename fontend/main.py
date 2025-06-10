from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow requests from any origin

# ✅ Replace with your actual Gemini API key
genai.configure(api_key="YOUR_GEMINI_API_KEY")

# ✅ Initialize the Gemini model
model = genai.GenerativeModel("gemini-pro")

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        prompt = data.get("query", "").strip()
        if not prompt:
            return jsonify({"error": "No input provided."}), 400

        # Generate response using Gemini
        response = model.generate_content(prompt)
        return jsonify({"reply": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/", methods=["GET"])
def home():
    return "✅ SahyogBot Gemini API is running."

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
