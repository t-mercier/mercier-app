import { Command } from '../types';
import achievementsData from '../../../data/achievements.json';

const achievements: Command = {
  name: 'achievements',
  description: 'Show awards, honors, and hackathon victories',
  aliases: ['awards', 'honors', 'wins'],
  handler: (args, ctx) => {
    return (
      <div className="space-y-6">
        <div className="font-bold text-hacker-green text-lg">🏆 Achievements & Awards</div>
        <div className="space-y-4">
          {achievementsData.map((achievement, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start justify-between border-b border-gray-800 pb-2">
                <div className="font-semibold text-hacker-green text-base">
                  {achievement.type} {achievement.title}
                </div>
                <div className="text-gray-400 text-sm text-right">
                  {achievement.date}
                </div>
              </div>
              <div className="text-gray-300 text-sm">
                <span className="text-hacker-green">{achievement.organization}</span>
              </div>
              <div className="text-gray-300 text-sm">
                {achievement.description}
              </div>
              <div className="space-y-1">
                {achievement.highlights.map((highlight, hIndex) => (
                  <div key={hIndex} className="text-gray-300 text-sm ml-2">
                    • {highlight}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {achievement.skills.map((skill, sIndex) => (
                  <span key={sIndex} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 border border-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-gray-400 text-sm mt-4 border-t border-gray-800 pt-4">
          <span className="text-hacker-green">Hackathon Results:</span> Some wins that show creative problem-solving and technical skills.
        </div>
      </div>
    );
  }
};

export default achievements;
