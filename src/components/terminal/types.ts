import React from "react";

export type CmdHandler = (args: string[], ctx: TerminalContext) => Promise<React.ReactNode> | React.ReactNode;

export type Command = {
  name: string;
  description: string;
  usage?: string;
  handler: CmdHandler;
  aliases?: string[];
};

export type OutputBlock = {
  id: string;
  node: React.ReactNode;
  timestamp: Date;
  command?: string;
};

export type TerminalContext = {
  theme: string;
  setTheme: (theme: string) => void;
  clearOutput: () => void;
  addOutput: (node: React.ReactNode, command?: string) => void;
  executeCommand?: (command: string) => void;
};

export type TerminalState = {
  input: string;
  history: string[];
  historyIndex: number;
  output: OutputBlock[];
  theme: string;
  cursorPosition: number;
  autocompleteSuggestions: string[];
  showAutocomplete: boolean;
};
