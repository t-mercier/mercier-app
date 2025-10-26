import { Command } from '../types';
import timelineData from '../../../data/timeline.json';

const timeline: Command = {
  name: 'timeline',
  description: 'Show career history in reverse chronological order',
  aliases: ['cv', 'history'],
  handler: (args, ctx) => {
    return (
      <div className="space-y-6">
        <div className="font-bold text-hacker-green text-lg">Career Timeline</div>
        <div className="space-y-4">
          {timelineData.map((entry, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start justify-between border-b border-gray-800 pb-2">
                <div className="font-semibold text-hacker-green text-base">
                  {entry.role}
                </div>
                <div className="text-gray-400 text-sm text-right">
                  {entry.period}
                </div>
              </div>
              <div className="text-gray-300 text-sm">
                <span className="text-hacker-green">{entry.company}</span>
                {entry.location && (
                  <span className="text-gray-400 ml-2">• {entry.location}</span>
                )}
              </div>
              <div className="text-gray-300 text-sm">
                {entry.description}
              </div>
              <div className="space-y-1">
                {entry.highlights.map((highlight, hIndex) => (
                  <div key={hIndex} className="text-gray-300 text-sm ml-2">
                    • {highlight}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-gray-400 text-sm mt-4 border-t border-gray-800 pt-4">
          <span className="text-hacker-green">Journey:</span> From creative direction to technical leadership, bridging design and engineering worlds.
        </div>
      </div>
    );
  }
};

export default timeline;
