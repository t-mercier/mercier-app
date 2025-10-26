import { Command } from '../types';

const quotes = [
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay"
  },
  {
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs"
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House"
  },
  {
    text: "The computer was born to solve problems that did not exist before.",
    author: "Bill Gates"
  },
  {
    text: "Technology should serve human creativity, not replace it.",
    author: "Timothée Mercier"
  },
  {
    text: "The best code is no code at all.",
    author: "Jeff Atwood"
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci"
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson"
  },
  {
    text: "The future belongs to those who understand that the intersection of art and technology is where innovation happens.",
    author: "Timothée Mercier"
  }
];

const quote: Command = {
  name: 'quote',
  description: 'Display a random inspirational quote',
  handler: (args, ctx) => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    return (
      <div className="space-y-3 border-l-2 border-hacker-green/30 pl-4">
        <div className="text-gray-300 italic text-lg">
          &ldquo;{randomQuote.text}&rdquo;
        </div>
        <div className="text-hacker-green text-sm">
          — {randomQuote.author}
        </div>
      </div>
    );
  }
};

export default quote;
