import React from 'react';
import { render, screen } from '@testing-library/react';
import { help } from '../commands/help';

// Mock the registry for testing
jest.mock('../commands/index', () => ({
  registry: [
    { name: 'help', description: 'Show available commands' },
    { name: 'skills', description: 'Show skills' },
    { name: 'projects', description: 'Show projects' },
  ]
}));

describe('Help Command', () => {
  const mockContext = {
    theme: 'green',
    setTheme: jest.fn(),
    clearOutput: jest.fn(),
    addOutput: jest.fn(),
  };

  test('renders help command list', () => {
    const result = help.handler([], mockContext);
    const { container } = render(<div>{result}</div>);
    
    expect(container.textContent).toContain('mercier.app commands:');
    expect(container.textContent).toContain('help');
    expect(container.textContent).toContain('Show available commands');
  });

  test('renders specific command help', () => {
    const result = help.handler(['help'], mockContext);
    const { container } = render(<div>{result}</div>);
    
    expect(container.textContent).toContain('help');
    expect(container.textContent).toContain('Show available commands');
  });

  test('handles unknown command', () => {
    const result = help.handler(['unknown'], mockContext);
    const { container } = render(<div>{result}</div>);
    
    expect(container.textContent).toContain("Command 'unknown' not found");
  });

  test('has correct command metadata', () => {
    expect(help.name).toBe('help');
    expect(help.description).toBe('Show available commands or get help for a specific command');
    expect(help.usage).toBe('help [command]');
  });
});
