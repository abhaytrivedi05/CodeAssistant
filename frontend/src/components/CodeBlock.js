import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ code }) => {
  // Extract language and code from markdown code blocks
  const extractCodeContent = (codeString) => {
    if (typeof codeString !== 'string') return { language: 'text', code: String(codeString) };
    
    // Handle markdown code blocks
    const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/;
    const match = codeString.match(codeBlockRegex);
    
    if (match) {
      return {
        language: match[1] || 'python',
        code: match[2].trim()
      };
    }
    
    // If no code block markers, assume it's plain code
    return {
      language: 'python',
      code: codeString.trim()
    };
  };

  const { language, code: cleanCode } = extractCodeContent(code);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cleanCode).then(() => {
      // You could add a toast notification here
      console.log('Code copied to clipboard');
    });
  };

  return (
    <div className="code-block">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '8px 12px',
        background: '#f1f3f4',
        borderBottom: '1px solid #e1e5e9',
        fontSize: '0.9rem'
      }}>
        <span style={{ color: '#666', fontWeight: '600' }}>
          {language.toUpperCase()}
        </span>
        <button
          onClick={copyToClipboard}
          style={{
            background: 'none',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '4px 8px',
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}
        >
          Copy
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        customStyle={{
          margin: 0,
          borderRadius: '0 0 6px 6px'
        }}
      >
        {cleanCode}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;