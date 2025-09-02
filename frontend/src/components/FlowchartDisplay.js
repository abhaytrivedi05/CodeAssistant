import React, { useEffect, useRef, useState } from 'react';

const FlowchartDisplay = ({ flowchart }) => {
  const chartRef = useRef(null);
  const [mermaidLoaded, setMermaidLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Dynamically import mermaid to avoid SSR issues
    const loadMermaid = async () => {
      try {
        const mermaid = await import('mermaid');
        
        // Initialize mermaid with proper configuration
        mermaid.default.initialize({ 
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          fontFamily: 'Arial, sans-serif'
        });
        
        setMermaidLoaded(true);
        return mermaid.default;
      } catch (err) {
        console.error('Failed to load mermaid:', err);
        setError('Failed to load flowchart library');
        return null;
      }
    };

    if (flowchart && chartRef.current && !mermaidLoaded) {
      loadMermaid().then(mermaidInstance => {
        if (mermaidInstance && chartRef.current) {
          renderChart(mermaidInstance);
        }
      });
    } else if (flowchart && chartRef.current && mermaidLoaded) {
      // If mermaid is already loaded, render immediately
      import('mermaid').then(mermaid => {
        renderChart(mermaid.default);
      });
    }
  }, [flowchart, mermaidLoaded]);

  const renderChart = async (mermaidInstance) => {
    if (!chartRef.current || !flowchart) return;

    try {
      // Extract mermaid code from markdown if needed
      let mermaidCode = flowchart;
      if (typeof flowchart === 'string') {
        const mermaidMatch = flowchart.match(/```mermaid\n?([\s\S]*?)```/);
        if (mermaidMatch) {
          mermaidCode = mermaidMatch[1].trim();
        }
      }

      // Clear previous content
      chartRef.current.innerHTML = '';

      // Generate unique ID for this chart
      const chartId = 'flowchart-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

      // Render the flowchart using the newer API
      try {
        const { svg } = await mermaidInstance.render(chartId, mermaidCode);
        if (chartRef.current) {
          chartRef.current.innerHTML = svg;
        }
      } catch (renderError) {
        // Fallback for older mermaid versions
        mermaidInstance.render(chartId, mermaidCode, (svgCode) => {
          if (chartRef.current) {
            chartRef.current.innerHTML = svgCode;
          }
        });
      }
    } catch (error) {
      console.error('Error rendering flowchart:', error);
      setError('Unable to render flowchart');
      
      // Show raw mermaid code as fallback
      if (chartRef.current) {
        chartRef.current.innerHTML = `
          <div style="padding: 20px; text-align: center; color: #666; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9;">
            <p><strong>Flowchart Preview Unavailable</strong></p>
            <p style="font-size: 0.9rem; margin-bottom: 16px;">The flowchart couldn't be rendered, but here's the structure:</p>
            <details style="text-align: left;">
              <summary style="cursor: pointer; font-weight: bold; margin-bottom: 8px;">View Mermaid Code</summary>
              <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; font-size: 0.8rem;">${flowchart}</pre>
            </details>
          </div>
        `;
      }
    }
  };

  if (!flowchart) {
    return (
      <div className="flowchart-container">
        <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
          No flowchart available for this solution
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flowchart-container">
        <div style={{ padding: '20px', textAlign: 'center', color: '#666', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
          <p><strong>Flowchart Error</strong></p>
          <p>{error}</p>
          <details style={{ textAlign: 'left', marginTop: '16px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Raw Flowchart Code</summary>
            <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto', fontSize: '0.8rem' }}>
              {flowchart}
            </pre>
          </details>
        </div>
      </div>
    );
  }

  return (
    <div className="flowchart-container">
      <div 
        ref={chartRef} 
        style={{ 
          minHeight: '200px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        <div style={{ color: '#667eea', display: 'flex', alignItems: 'center' }}>
          <div className="spinner" style={{ marginRight: '12px' }}></div>
          Loading flowchart...
        </div>
      </div>
    </div>
  );
};

export default FlowchartDisplay;