export type { CmdHandler, Command } from '../types';

import help from "./help";
import skills from "./skills";
import projects from "./projects";
import timeline from "./timeline";
import achievements from "./achievements";
import about from "./about";
import contact from "./contact";
import clear from "./clear";
import fullscreen from "./fullscreen";
import theme from "./theme";
import chaos from "./chaos";
import quote from "./quote";

export const registry = [
  help, skills, projects, timeline, achievements, about, contact, clear, fullscreen, theme, chaos, quote,
];

export function findCommand(name: string) {
  const lower = name.toLowerCase();
  return registry.find(c => c.name === lower || c.aliases?.includes(lower));
}

export const commandNames = () => [...new Set(registry.flatMap(c => [c.name, ...(c.aliases ?? [])]))];
