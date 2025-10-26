import { Command } from '../types';

const chaos: Command = {
  name: 'chaos',
  description: 'Brief glitch effect with randomized colors and text jitter',
  handler: (args, ctx) => {
    // Check if user prefers reduced motion (client-side only)
    if (typeof window === 'undefined') {
      return (
        <div className="text-gray-400">
          Chaos mode requires client-side execution.
        </div>
      );
    }
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return (
        <div className="text-gray-400">
          Chaos mode disabled due to reduced motion preference.
        </div>
      );
    }

    // Add chaos effect to the terminal
    const terminal = document.querySelector('[data-terminal]');
    if (terminal) {
      terminal.classList.add('chaos-mode');
      setTimeout(() => {
        terminal.classList.remove('chaos-mode');
      }, 2000);
    }

    return (
      <div className="text-hacker-green animate-pulse">
        <div className="chaos-text">C H A O S   M O D E   A C T I V A T E D</div>
        <div className="text-sm mt-2">System glitching... please stand by...</div>
      </div>
    );
  }
};

export default chaos;
