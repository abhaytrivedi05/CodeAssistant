import React from 'react';

const SimpleFlowchartDisplay = ({ flowchart }) => {
  if (!flowchart) {
    return (
      <div className="flowchart-container">
        <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
          No flowchart available for this solution
        </p>
      </div>
    );
  }

  // Extract mermaid code from markdown if needed
  let mermaidCode = flowchart;
  if (typeof flowchart === 'string') {
    const mermaidMatch = flowchart.match(/```mermaid\n?([\s\S]*?)```/);
    if (mermaidMatch) {
      mermaidCode = mermaidMatch[1].trim();
    }
  }

  // Simple text-based flowchart representation
  const parseSimpleFlow = (code) => {
    const lines = code.split('\n').filter(line => line.trim());
    const steps = [];
    
    lines.forEach(line => {
      // Extract node definitions like "A[Start]" or "B{Decision}"
      const nodeMatch = line.match(/(\w+)\[(.*?)\]|(\w+)\{(.*?)\}/);
      if (nodeMatch) {
        const id = nodeMatch[1] || nodeMatch[3];
        const text = nodeMatch[2] || nodeMatch[4];
        steps.push({ id, text, type: nodeMatch[2] ? 'process' : 'decision' });
      }
    });
    
    return steps;
  };

  const steps = parseSimpleFlow(mermaidCode);

  return (
    <div className="flowchart-container">
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '16px', textAlign: 'center' }}>
          <h4 style={{ color: '#333', marginBottom: '8px' }}>Solution Flow</h4>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Step-by-step process visualization</p>
        </div>
        
        {steps.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            {steps.map((step, index) => (
              <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    padding: '12px 20px',
                    borderRadius: step.type === 'decision' ? '50%' : '8px',
                    background: step.type === 'decision' ? '#fff3cd' : '#d1ecf1',
                    border: `2px solid ${step.type === 'decision' ? '#ffc107' : '#17a2b8'}`,
                    color: '#333',
                    fontWeight: '500',
                    textAlign: 'center',
                    minWidth: '120px',
                    maxWidth: '300px'
                  }}
                >
                  {step.text}
                </div>
                {index < steps.length - 1 && (
                  <div
                    style={{
                      width: '2px',
                      height: '20px',
                      background: '#667eea',
                      margin: '4px 0'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ color: '#666', marginBottom: '16px' }}>
              Flowchart structure (Mermaid format):
            </p>
            <pre
              style={{
                background: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '6px',
                padding: '16px',
                textAlign: 'left',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: '#495057'
              }}
            >
              {mermaidCode}
            </pre>
            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '12px' }}>
              💡 This shows the logical flow of the solution approach
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleFlowchartDisplay;