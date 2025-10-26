import React, { useState } from 'react';
import { OutputBlock as OutputBlockType } from './types';

interface OutputBlockProps {
  block: OutputBlockType;
  theme: string;
}

export default function OutputBlock({ block, theme }: OutputBlockProps) {
  const getThemeColor = () => {
    if (theme === 'amber') return '#ffcc66';
    if (theme === 'ice') return '#9be7ff';
    return '#00ff7f'; // default green
  };
  
  const getThemeBorderColor = () => {
    if (theme === 'amber') return 'rgba(255, 204, 102, 0.3)';
    if (theme === 'ice') return 'rgba(155, 231, 255, 0.3)';
    return 'rgba(0, 255, 127, 0.3)'; // default green
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
        e.currentTarget.style.borderColor = getThemeBorderColor();
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
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopy}
            className="px-2 py-1 text-xs border rounded bg-black/50 transition-colors"
            style={{ 
              borderColor: getThemeColor(),
              color: getThemeColor()
            }}
            onMouseEnter={(e) => {
              const themeColor = getThemeColor();
              if (theme === 'amber') {
                e.currentTarget.style.backgroundColor = 'rgba(255, 204, 102, 0.2)';
              } else if (theme === 'ice') {
                e.currentTarget.style.backgroundColor = 'rgba(155, 231, 255, 0.2)';
              } else {
                e.currentTarget.style.backgroundColor = 'rgba(0, 255, 127, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            }}
            aria-label="Copy to clipboard"
          >
            Copy
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-2" style={{ color: getThemeColor() }}>
          {block.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
