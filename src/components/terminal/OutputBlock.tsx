import React, { useState } from 'react';
import { OutputBlock as OutputBlockType } from './types';

interface OutputBlockProps {
  block: OutputBlockType;
}

export default function OutputBlock({ block }: OutputBlockProps) {
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
      className="group relative border-l-2 border-transparent hover:border-hacker-green/30 transition-colors"
      onMouseEnter={() => setShowCopyButton(true)}
      onMouseLeave={() => setShowCopyButton(false)}
    >
      <div className="pl-4 py-2">
        {block.command && (
          <div className="flex items-center space-x-2 mb-2 text-sm">
            <span className="text-hacker-green font-mono">$</span>
            <span className="font-mono text-hacker-green/80">{block.command}</span>
          </div>
        )}
        <div>
          {block.node}
        </div>
        <div className="text-xs text-gray-600 mt-1">
          {block.timestamp.toLocaleTimeString()}
        </div>
      </div>
      
      <button
        onClick={handleCopy}
        className={`absolute top-2 right-2 px-2 py-1 text-xs bg-black border border-hacker-green/30 text-hacker-green hover:bg-hacker-green/10 transition-colors ${
          showCopyButton ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Copy output to clipboard"
      >
        Copy
      </button>
    </div>
  );
}
