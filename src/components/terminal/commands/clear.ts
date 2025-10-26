import { Command } from '../types';

const clear: Command = {
  name: 'clear',
  description: 'Clear the terminal screen',
  handler: (args, ctx) => {
    ctx.clearOutput();
    return null;
  }
};

export default clear;
