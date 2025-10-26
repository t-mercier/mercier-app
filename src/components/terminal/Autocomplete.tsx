import React from 'react';
import { registry, commandNames } from './commands';

export function getAutocompleteSuggestions(input: string): string[] {
  if (!input.trim()) return [];

  const allCommands = commandNames();
  const suggestions = allCommands.filter(cmd => 
    cmd.toLowerCase().startsWith(input.toLowerCase())
  );

  return suggestions.slice(0, 10); // Limit to 10 suggestions
}

export function parseCommand(input: string): { command: string; args: string[] } {
  // Simple command parser that handles quoted arguments
  const parts = input.trim().split(/(\s+|"[^"]*"|'[^']*')/);
  const filteredParts = parts
    .filter(part => part.trim() && !part.match(/^\s+$/))
    .map(part => part.replace(/^["']|["']$/g, '')); // Remove quotes

  const command = filteredParts[0] || '';
  const args = filteredParts.slice(1);

  return { command, args };
}
