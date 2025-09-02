import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProblemForm from './components/ProblemForm';
import SolutionDisplay from './components/SolutionDisplay';
import Header from './components/Header';
import './App.css';

function App() {
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    try {
      const response = await axios.get('/fields');
      setFields(response.data);
    } catch (err) {
      console.error('Failed to fetch fields:', err);
      // Fallback fields if API fails
      setFields([
        { id: 'dsa', name: 'Data Structures & Algorithms', description: 'Coding problems, algorithms, data structures' },
        { id: 'ml', name: 'Machine Learning', description: 'ML algorithms, model training, data analysis' },
        { id: 'cloud', name: 'Cloud Computing', description: 'AWS, Azure, GCP, cloud architecture' },
        { id: 'ai', name: 'Artificial Intelligence', description: 'AI systems, neural networks, NLP' },
        { id: 'cyber', name: 'Cybersecurity', description: 'Security protocols, penetration testing, vulnerabilities' }
      ]);
    }
  };

  const handleSolveProblem = async (problemData) => {
    setLoading(true);
    setError(null);
    setSolution(null);

    try {
      const response = await axios.post('/solve', problemData);
      setSolution(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to solve problem. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSolution(null);
    setError(null);
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        {error && (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        <ProblemForm 
          onSubmit={handleSolveProblem}
          loading={loading}
          fields={fields}
          onReset={handleReset}
        />
        
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <span>Analyzing problem and generating solution...</span>
          </div>
        )}
        
        {solution && <SolutionDisplay solution={solution} />}
      </div>
    </div>
  );
}

export default App;