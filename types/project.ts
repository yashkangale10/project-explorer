export interface Project {
  id: number;
  name: string;
  status: "active" | "completed" | "on-hold";
  overview: string;
  team: string[];
  tasks: string[];
}
