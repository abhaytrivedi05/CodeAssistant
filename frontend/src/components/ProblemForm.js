import React, { useState } from 'react';

const ProblemForm = ({ onSubmit, loading, fields, onReset }) => {
  const [problemStatement, setProblemStatement] = useState('');
  const [selectedField, setSelectedField] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!problemStatement.trim() || !selectedField) {
      alert('Please enter a problem statement and select a field');
      return;
    }
    
    onSubmit({
      problem_statement: problemStatement.trim(),
      field: selectedField
    });
  };

  const handleReset = () => {
    setProblemStatement('');
    setSelectedField('');
    onReset();
  };

  return (
    <div className="card problem-form">
      <h2>Enter Your Problem</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Problem Statement</label>
          <textarea
            className="form-control textarea"
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
            placeholder="Paste or type your problem statement here..."
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Select Field</label>
          <div className="field-grid">
            {fields.map((field) => (
              <div
                key={field.id}
                className={`field-option ${selectedField === field.id ? 'selected' : ''}`}
                onClick={() => !loading && setSelectedField(field.id)}
              >
                <h3>{field.name}</h3>
                <p>{field.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !problemStatement.trim() || !selectedField}
          >
            {loading ? 'Solving...' : 'Solve Problem'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProblemForm;