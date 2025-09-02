

# CodeAssistant

An intelligent platform that provides comprehensive, step-by-step solutions for complex problems across multiple technical domains. Powered by Google's Gemini AI, this application analyzes problems and delivers structured solutions with multiple approaches, code implementations, and visual flowcharts.

## Features

🧠 **Multi-Domain Support**: DSA, ML, Cloud, AI, and Cybersecurity  
📊 **Visual Flowcharts**: Mermaid-based solution flowcharts  
🚀 **Multiple Approaches**: Brute force, optimized, and alternative solutions  
💡 **Detailed Explanations**: Step-by-step problem breakdown  
📝 **Code Examples**: Complete, runnable code implementations  
⚡ **Real-time Processing**: Powered by Google Gemini AI  

## Tech Stack

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

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- Google Gemini API key

### Backend Setup
1. Navigate to backend directory
   ```bash
   cd backend
   ```
2. Create virtual environment
   ```bash
   python -m venv venv
   ```
3. Activate virtual environment
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
4. Install dependencies
   ```bash
   pip install -r req.txt
   ```
5. Configure environment variables
   ```bash
   # Copy the example file
   copy .env.example .env
   # Edit .env and add your Gemini API key
   GEMINI_API_KEY=your_actual_api_key_here
   ```
6. Run the backend server
   ```bash
   python app.py
   ```
   The backend will run on http://localhost:5000

### Frontend Setup
1. Navigate to frontend directory
   ```bash
   cd frontend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm start
   ```
   The frontend will run on http://localhost:3000

## Getting Your Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env` file in the backend directory

## Usage
1. Open the application at http://localhost:3000
2. Enter your problem statement in the text area
3. Select the relevant field (DSA, ML, Cloud, AI, or Cyber)
4. Click "Solve Problem" to get comprehensive solutions
5. Review the results including:
   - Problem explanation
   - Multiple solution approaches
   - Code implementations
   - Visual flowchart
   - Key insights and related concepts

## API Endpoints

### POST /solve
Analyzes a problem and returns comprehensive solutions.

**Request Body:**
```json
{
  "problem_statement": "Your problem description here",
  "field": "dsa|ml|cloud|ai|cyber"
}
```

**Response:**
```json
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
```

### GET /fields
Returns available problem fields.

### GET /health
Health check endpoint.

## Example Problems

### Data Structures & Algorithms
Find the longest palindromic substring in a given string.

### Machine Learning
Implement a decision tree classifier from scratch and explain the splitting criteria.

### Cloud Computing
Design a scalable microservices architecture on AWS for an e-commerce platform.

### Artificial Intelligence
Implement the A* pathfinding algorithm and explain its heuristic function.

### Cybersecurity
Explain SQL injection attacks and implement prevention mechanisms.

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License
This project is licensed under the MIT License.

## Troubleshooting

### Common Issues
**"Module not found" errors**
- Ensure you've activated the virtual environment
- Run `pip install -r req.txt` again

**CORS errors**
- Make sure both frontend and backend are running
- Check that the proxy is configured in package.json

**API key errors**
- Verify your Gemini API key is correct
- Check that the .env file is in the backend directory

**Flowchart not rendering**
- Check browser console for JavaScript errors
- Ensure mermaid syntax is valid

### Getting Help
If you encounter issues:
- Check the console logs (both browser and terminal)
- Verify all dependencies are installed
- Ensure API keys are properly configured
- Check that both servers are running on correct ports

## About
This project provides an AI-powered solution for complex technical problems across multiple domains, helping developers and engineers understand and implement solutions more effectively.
