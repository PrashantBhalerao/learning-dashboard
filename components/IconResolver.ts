import {
  Code2,
  FileCode,
  Network,
  Cloud,
  Database,
  Globe,
  Cpu,
  Terminal,
  Layers,
  BookOpen,
  Brain,
  Rocket,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  FileCode,
  Network,
  Cloud,
  Database,
  Globe,
  Cpu,
  Terminal,
  Layers,
  BookOpen,
  Brain,
  Rocket,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? BookOpen;
}
