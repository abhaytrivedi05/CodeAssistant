import React from 'react';
import CodeBlock from './CodeBlock';
import SimpleFlowchartDisplay from './SimpleFlowchartDisplay';

const SolutionDisplay = ({ solution }) => {
  if (!solution) return null;

  // Handle error case
  if (solution.error) {
    return (
      <div className="card">
        <div className="error">
          <h3>Error Processing Solution</h3>
          <p>{solution.error}</p>
          {solution.raw_response && (
            <details>
              <summary>Raw Response</summary>
              <pre>{solution.raw_response}</pre>
            </details>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="solution-container">
      {/* Problem Explanation */}
      <div className="card solution-section">
        <h2>📋 Problem Explanation</h2>
        <p>{solution.explanation}</p>
      </div>

      {/* Approaches */}
      {solution.approaches && solution.approaches.length > 0 && (
        <div className="card solution-section">
          <h2>🚀 Solution Approaches</h2>
          <div className="approaches-grid">
            {solution.approaches.map((approach, index) => (
              <div key={index} className="approach-card">
                <div className="approach-header">
                  <h3>{approach.name}</h3>
                  <div className="approach-complexity">{approach.complexity}</div>
                </div>
                <div className="approach-content">
                  <div className="approach-description">
                    {approach.description}
                  </div>
                  
                  {(approach.pros || approach.cons) && (
                    <div className="pros-cons">
                      {approach.pros && (
                        <div className="pros">
                          <h4>✅ Pros</h4>
                          <ul>
                            {approach.pros.map((pro, i) => (
                              <li key={i}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {approach.cons && (
                        <div className="cons">
                          <h4>❌ Cons</h4>
                          <ul>
                            {approach.cons.map((con, i) => (
                              <li key={i}>{con}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {approach.code && (
                    <div>
                      <h4>Code Implementation:</h4>
                      <CodeBlock code={approach.code} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Flowchart */}
      {solution.flowchart && (
        <div className="card solution-section">
          <h2>📊 Solution Flowchart</h2>
          <SimpleFlowchartDisplay flowchart={solution.flowchart} />
        </div>
      )}

      {/* Key Insights and Related Concepts */}
      {(solution.keyInsights || solution.relatedConcepts) && (
        <div className="card solution-section">
          <h2>💡 Additional Information</h2>
          <div className="insights-grid">
            {solution.keyInsights && (
              <div className="insights-section">
                <h3>Key Insights</h3>
                <ul>
                  {solution.keyInsights.map((insight, index) => (
                    <li key={index}>{insight}</li>
                  ))}
                </ul>
              </div>
            )}
            {solution.relatedConcepts && (
              <div className="insights-section">
                <h3>Related Concepts</h3>
                <ul>
                  {solution.relatedConcepts.map((concept, index) => (
                    <li key={index}>{concept}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SolutionDisplay;