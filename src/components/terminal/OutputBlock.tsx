import React, { useState } from 'react';
import { OutputBlock as OutputBlockType } from './types';

interface OutputBlockProps {
  block: OutputBlockType;
}

export default function OutputBlock({ block }: OutputBlockProps) {
  const getThemeColor = () => {
    const terminal = document.querySelector('[data-terminal]');
    if (terminal?.classList.contains('theme-amber')) return 'var(--terminal-color)';
    if (terminal?.classList.contains('theme-ice')) return 'var(--terminal-color)';
    return '#00ff7f'; // default green
  };
  const [showCopyButton, setShowCopyButton] = useState(false);

  const handleCopy = async () => {
    try {
      // Extract text content from the React node for copying
      const textContent = extractTextContent(block.node);
      await navigator.clipboard.writeText(textContent);
    } catch (err) {
      console.warn('Failed to copy to clipboard:', err);
    }
  };

  const extractTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return node.toString();
    if (React.isValidElement(node)) {
      if (typeof node.props.children === 'string') {
        return node.props.children;
      }
      if (Array.isArray(node.props.children)) {
        return node.props.children.map(extractTextContent).join('');
      }
      if (typeof node.props.children === 'object') {
        return extractTextContent(node.props.children);
      }
    }
    return '';
  };

  return (
    <div 
      className="group relative border-l-2 border-transparent transition-colors"
      style={{ borderColor: 'transparent' }}
      onMouseEnter={(e) => {
        setShowCopyButton(true);
        const terminal = document.querySelector('[data-terminal]');
        if (terminal?.classList.contains('theme-amber')) {
          e.currentTarget.style.borderColor = 'rgba(255, 204, 102, 0.3)';
        } else if (terminal?.classList.contains('theme-ice')) {
          e.currentTarget.style.borderColor = 'rgba(155, 231, 255, 0.3)';
        } else {
          e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.3)';
        }
      }}
      onMouseLeave={(e) => {
        setShowCopyButton(false);
        e.currentTarget.style.borderColor = 'transparent';
      }}
    >
      <div className="pl-4 py-2">
        {block.command && (
          <div className="flex items-center space-x-2 mb-2 text-sm">
            <span className="font-mono" style={{ color: getThemeColor() }}>$</span>
            <span className="font-mono" style={{ color: getThemeColor(), opacity: 0.8 }}>{block.command}</span>
          </div>
        )}
        <div>
          {block.node}
        </div>
        <div className="text-xs mt-1" style={{ color: 'var(--terminal-color)' }}>
          {block.timestamp.toLocaleTimeString()}
        </div>
      </div>
      
      <button
        onClick={handleCopy}
        className={`absolute top-2 right-2 px-2 py-1 text-xs bg-black border transition-colors ${
          showCopyButton ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          borderColor: `var(--terminal-color)`,
          color: `var(--terminal-color)`
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = `rgba(${getThemeColor() === 'var(--terminal-color)' ? '255, 204, 102' : '155, 231, 255'}, 0.1)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '';
        }}
        aria-label="Copy output to clipboard"
      >
        Copy
      </button>
    </div>
  );
}
