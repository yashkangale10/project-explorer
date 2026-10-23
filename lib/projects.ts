import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";

export const projects: Project[] = projectsData as Project[];

export function getProjects(): Project[] {
  return projects;
}

export function getProjectById(id: string | number): Project | undefined {
  return projects.find((project) => String(project.id) === String(id));
}

export function getFilteredProjects(filters: {
  search?: string;
  status?: string;
}): Project[] {
  let filtered = projects;

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (project) =>
        project.name.toLowerCase().includes(searchLower) ||
        project.overview.toLowerCase().includes(searchLower),
    );
  }

  if (filters.status) {
    filtered = filtered.filter((project) => project.status === filters.status);
  }

  return filtered;
}

export function getAllStatuses(): string[] {
  return Array.from(new Set(projects.map((p) => p.status)));
}
