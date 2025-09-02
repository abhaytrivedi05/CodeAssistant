# app.py
import os
import json
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

def generate_prompt(problem_statement, field):
    field_contexts = {
        "dsa": "Data Structures and Algorithms",
        "ml": "Machine Learning",
        "cloud": "Cloud Computing",
        "ai": "Artificial Intelligence",
        "cyber": "Cybersecurity"
    }
    
    context = field_contexts.get(field.lower(), field)
    
    return f"""
    You are an expert in {context}. Analyze the following problem statement and provide a comprehensive solution.

    Problem Statement: {problem_statement}

    IMPORTANT: Respond with ONLY valid JSON. No markdown code blocks, no extra text, just pure JSON.

    Use this exact JSON structure:
    {{
        "explanation": "Clear explanation of what the problem is asking for, including key concepts and requirements",
        "approaches": [
            {{
                "name": "Brute Force",
                "description": "Detailed explanation of the brute force approach",
                "complexity": "Time and space complexity analysis",
                "pros": ["List of advantages"],
                "cons": ["List of disadvantages"],
                "code": "Complete working code solution with proper escaping"
            }},
            {{
                "name": "Optimized",
                "description": "Detailed explanation of the optimized approach",
                "complexity": "Time and space complexity analysis", 
                "pros": ["List of advantages"],
                "cons": ["List of disadvantages"],
                "code": "Complete working code solution with proper escaping"
            }}
        ],
        "flowchart": "Mermaid flowchart syntax representing the solution flow",
        "keyInsights": ["Important insights and takeaways from this problem"],
        "relatedConcepts": ["Related topics the user should know"]
    }}

    Rules for JSON:
    1. Escape all quotes in strings with backslashes
    2. Use \\n for newlines in code blocks
    3. No trailing commas
    4. All strings must be properly quoted
    5. Make sure the code is complete, runnable, and well-commented
    """

def parse_ai_response(response_text):
    """Parse AI response with multiple fallback strategies"""
    import re
    
    # Strategy 1: Direct JSON parsing
    try:
        return json.loads(response_text)
    except json.JSONDecodeError:
        pass
    
    # Strategy 2: Extract from markdown code blocks
    if '```json' in response_text:
        start = response_text.find('```json') + 7
        end = response_text.rfind('```')
        json_text = response_text[start:end].strip()
        try:
            return json.loads(json_text)
        except json.JSONDecodeError:
            pass
    
    # Strategy 3: Find JSON-like structure
    json_match = re.search(r'\{[\s\S]*\}', response_text)
    if json_match:
        json_text = json_match.group()
        try:
            return json.loads(json_text)
        except json.JSONDecodeError:
            pass
    
    # Strategy 4: Manual parsing for known structure
    try:
        # Extract key sections manually
        explanation_match = re.search(r'"explanation":\s*"([^"]*(?:\\.[^"]*)*)"', response_text)
        explanation = explanation_match.group(1) if explanation_match else "Problem analysis provided by AI"
        
        # Create a basic structure
        return {
            "explanation": explanation,
            "approaches": [{
                "name": "AI Solution",
                "description": "The AI provided a solution but formatting was unclear. Please try a simpler problem statement.",
                "complexity": "Analysis provided in raw response",
                "pros": ["AI-generated solution"],
                "cons": ["Formatting issues"],
                "code": "# See raw response for code details"
            }],
            "flowchart": "graph TD\n    A[Problem] --> B[AI Analysis]\n    B --> C[Solution]",
            "keyInsights": ["AI response formatting needs improvement"],
            "relatedConcepts": ["Problem solving", "AI assistance"],
            "raw_response": response_text[:2000] + "..." if len(response_text) > 2000 else response_text
        }
    except Exception:
        # Final fallback
        return {
            "explanation": "AI response could not be parsed",
            "error": "Response parsing failed",
            "raw_response": response_text[:1000] + "..." if len(response_text) > 1000 else response_text
        }

@app.route('/solve', methods=['POST'])
def solve():
    data = request.json
    problem_statement = data.get('problem_statement')
    field = data.get('field')
    
    if not problem_statement or not field:
        return jsonify({"error": "Missing problem statement or field"}), 400
    
    # Validate field
    valid_fields = ['dsa', 'ml', 'cloud', 'ai', 'cyber']
    if field.lower() not in valid_fields:
        return jsonify({"error": f"Invalid field. Must be one of: {', '.join(valid_fields)}"}), 400
    
    prompt = generate_prompt(problem_statement, field)
    
    try:
        response = model.generate_content(prompt)
        response_text = response.text.strip()
        
        # Use improved parsing function
        result = parse_ai_response(response_text)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": f"API Error: {str(e)}"}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "message": "Problem Solver API is running"})

@app.route('/fields', methods=['GET'])
def get_fields():
    fields = [
        {"id": "dsa", "name": "Data Structures & Algorithms", "description": "Coding problems, algorithms, data structures"},
        {"id": "ml", "name": "Machine Learning", "description": "ML algorithms, model training, data analysis"},
        {"id": "cloud", "name": "Cloud Computing", "description": "AWS, Azure, GCP, cloud architecture"},
        {"id": "ai", "name": "Artificial Intelligence", "description": "AI systems, neural networks, NLP"},
        {"id": "cyber", "name": "Cybersecurity", "description": "Security protocols, penetration testing, vulnerabilities"}
    ]
    return jsonify(fields)

if __name__ == '__main__':
    app.run(debug=True)