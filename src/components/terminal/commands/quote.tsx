import { Command } from '../types';

const quotes = [
  // Nietzsche
  {
    text: "One must still have chaos in oneself to be able to give birth to a dancing star.",
    author: "Friedrich Nietzsche"
  },
  {
    text: "He who fights with monsters should look to it that he himself does not become a monster. And if you gaze long into an abyss, the abyss also gazes into you.",
    author: "Friedrich Nietzsche"
  },
  {
    text: "Without music, life would be a mistake.",
    author: "Friedrich Nietzsche"
  },
  {
    text: "God is dead. God remains dead. And we have killed him.",
    author: "Friedrich Nietzsche"
  },
  {
    text: "Become what you are.",
    author: "Friedrich Nietzsche"
  },
  {
    text: "That which does not kill us makes us stronger.",
    author: "Friedrich Nietzsche"
  },
  
  // Machiavelli
  {
    text: "It is better to be feared than loved, if you cannot be both.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "The first method for estimating the intelligence of a ruler is to look at the men he has around him.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "Men judge generally more by the eye than by the hand, for everyone can see and few can feel. Everyone sees what you appear to be, few really know what you are.",
    author: "Niccolò Machiavelli"
  },
  {
    text: "The wise man does at once what the fool does finally.",
    author: "Niccolò Machiavelli"
  },
  
  // Carl Jung
  {
    text: "Until you make the unconscious conscious, it will direct your life and you will call it fate.",
    author: "Carl Jung"
  },
  {
    text: "The meeting of two personalities is like the contact of two chemical substances: if there is any reaction, both are transformed.",
    author: "Carl Jung"
  },
  {
    text: "I am not what happened to me, I am what I choose to become.",
    author: "Carl Jung"
  },
  {
    text: "Who looks outside, dreams; who looks inside, awakes.",
    author: "Carl Jung"
  },
  {
    text: "In all chaos there is a cosmos, in all disorder a secret order.",
    author: "Carl Jung"
  },
  {
    text: "Every human being has a two-fold nature—he is at once conscious and unconscious.",
    author: "Carl Jung"
  }
];

const quote: Command = {
  name: 'quote',
  description: 'Display a random inspirational quote',
  handler: (args, ctx) => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    const getThemeColor = () => {
      if (typeof window !== 'undefined') {
        const terminal = document.querySelector('[data-terminal]');
        if (terminal?.classList.contains('theme-amber')) return '#ffcc66';
        if (terminal?.classList.contains('theme-ice')) return '#9be7ff';
      }
      return '#00ff7f'; // default green
    };
    
    return (
      <div 
        className="space-y-3 border-l-2 pl-4"
        style={{ borderColor: `${getThemeColor()}30` }}
      >
        <div className="text-gray-300 italic text-lg">
          &ldquo;{randomQuote.text}&rdquo;
        </div>
        <div className="text-sm" style={{ color: getThemeColor() }}>
          — {randomQuote.author}
        </div>
      </div>
    );
  }
};

export default quote;

