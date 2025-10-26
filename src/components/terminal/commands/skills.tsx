import { Command } from '../types';
import skillsData from '../../../data/skills.json';

const skills: Command = {
  name: 'skills',
  description: 'Show grouped skill map (design / engineering / bridge)',
  handler: (args, ctx) => {
    return (
      <div className="space-y-6">
        <div className="font-bold text-hacker-green text-lg">Skills & Expertise</div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.entries(skillsData).map(([key, category]) => (
            <div key={key} className="space-y-3">
              <div className="font-semibold text-hacker-green text-sm uppercase tracking-wider">
                {category.title}
              </div>
              <div className="space-y-1">
                {category.skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="text-gray-300 text-sm hover:text-hacker-green transition-colors cursor-default"
                  >
                    • {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-gray-400 text-sm mt-4 border-t border-gray-800 pt-4">
          <span className="text-hacker-green">Note:</span> These skills represent the intersection of technical expertise and creative thinking that drives innovative solutions.
        </div>
      </div>
    );
  }
};

export default skills;
