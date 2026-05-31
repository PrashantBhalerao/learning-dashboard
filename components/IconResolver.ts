import {
  Code2, FileCode, Network, Cloud, Database,
  Globe, Cpu, Terminal, Layers, BookOpen, Brain,
  Rocket, FlaskConical, Palette, Music, Camera,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  Code2, FileCode, Network, Cloud, Database,
  Globe, Cpu, Terminal, Layers, BookOpen, Brain,
  Rocket, FlaskConical, Palette, Music, Camera,
};

export function getIcon(name: string): LucideIcon {
  return MAP[name] ?? BookOpen;
}
