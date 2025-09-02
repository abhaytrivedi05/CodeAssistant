# 🧩 Problem Solver AI

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-Backend-black.svg)
![React](https://img.shields.io/badge/React-18-61DAFB.svg)
![Google Gemini](https://img.shields.io/badge/Google-GeminiAI-4285F4.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

An intelligent platform that provides **comprehensive, step-by-step solutions** for complex problems across multiple technical domains.  

Powered by **Google's Gemini AI**, this application analyzes problems and delivers structured solutions with multiple approaches, runnable code implementations, and **visual flowcharts**.

---

## ✨ Features

- 🧠 **Multi-Domain Support**: DSA, ML, Cloud, AI, and Cybersecurity  
- 📊 **Visual Flowcharts**: Mermaid-based solution flowcharts  
- 🚀 **Multiple Approaches**: Brute force, optimized, and alternative solutions  
- 💡 **Detailed Explanations**: Step-by-step problem breakdown  
- 📝 **Code Examples**: Complete, runnable code implementations  
- ⚡ **Real-time Processing**: Powered by Google Gemini AI  

---

## 🛠️ Tech Stack

### Backend
- Python 3.8+  
- Flask - Web framework  
- Google Generative AI - Gemini API for problem solving  
- Flask-CORS - Cross-origin resource sharing  

### Frontend
- React 18 - UI framework  
- Axios - HTTP client  
- Mermaid - Flowchart rendering  
- React Syntax Highlighter - Code highlighting  

---

## ⚙️ Setup Instructions

### Prerequisites
- Python 3.8 or higher  
- Node.js 16 or higher  
- Google Gemini API key  

---

### 🔹 Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r req.txt

# Configure environment variables
copy .env.example .env   # Windows
cp .env.example .env     # macOS/Linux

# Edit .env and add your Gemini API key
GEMINI_API_KEY=your_actual_api_key_here

# Run backend server
python app.py
➡️ Backend runs on: http://localhost:5000

🔹 Frontend Setup
bash
Copy code
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
➡️ Frontend runs on: http://localhost:3000

🔑 Getting Your Gemini API Key
Go to Google AI Studio

Sign in with your Google account

Create a new API key

Copy the key and add it to your .env file

🚀 Usage
Open the app at http://localhost:3000

Enter your problem statement in the text area

Select the field (DSA, ML, Cloud, AI, or Cyber)

Click "Solve Problem" to generate solutions

You’ll receive:

✅ Problem explanation

✅ Multiple solution approaches

✅ Complete code implementations

✅ Visual flowchart (Mermaid)

✅ Key insights & related concepts

📡 API Endpoints
POST /solve
Analyzes a problem and returns comprehensive solutions.

Request Body:

json
Copy code
{
  "problem_statement": "Your problem description here",
  "field": "dsa|ml|cloud|ai|cyber"
}
Response:

json
Copy code
{
  "explanation": "Problem explanation",
  "approaches": [
    {
      "name": "Approach name",
      "description": "Detailed description",
      "complexity": "Time and space complexity",
      "pros": ["List of advantages"],
      "cons": ["List of disadvantages"],
      "code": "Complete code implementation"
    }
  ],
  "flowchart": "Mermaid flowchart syntax",
  "keyInsights": ["Important insights"],
  "relatedConcepts": ["Related topics"]
}
GET /fields
Returns available problem fields.

GET /health
Health check endpoint.

📝 Example Problems
Data Structures & Algorithms
Find the longest palindromic substring in a given string.

Machine Learning
Implement a decision tree classifier from scratch and explain the splitting criteria.

Cloud Computing
Design a scalable microservices architecture on AWS for an e-commerce platform.

Artificial Intelligence
Implement the A* pathfinding algorithm and explain its heuristic function.

Cybersecurity
Explain SQL injection attacks and implement prevention mechanisms.

🤝 Contributing
Fork the repository

Create a feature branch

Make your changes

Add tests (if applicable)

Submit a pull request

📜 License
This project is licensed under the MIT License.

🛠️ Troubleshooting
Common Issues
"Module not found" errors

Ensure virtual environment is activated

Run pip install -r req.txt again

CORS errors

Ensure both frontend & backend are running

Verify proxy is set in package.json

API key errors

Check .env contains correct GEMINI_API_KEY

Flowchart not rendering

Validate Mermaid syntax

Check browser console logs

📢 Getting Help
Check console logs (frontend & backend)

Verify dependencies are installed

Ensure API keys are configured correctly

Make sure both servers are running on correct ports

📦 About
🚀 Problem Solver AI – Multi-domain problem solving made easy with Google Gemini AI.

pgsql
Copy code

Would you like me to also **add a section for screenshots/demo GIFs** so that when you run the project locally, you can just drop in images and make the README more visual?







Ask ChatGPT
