import Link from "next/link";
import { Suspense } from "react";
import { getFilteredProjects, getAllStatuses } from "@/lib/projects";
import ProjectFilters from "./ProjectFilters";

interface ProjectsContentProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProjectsContent({
  searchParams,
}: ProjectsContentProps) {
  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : "";
  const status = typeof params.status === "string" ? params.status : "";

  const projects = getFilteredProjects({ search, status });
  const statuses = getAllStatuses();

  return (
    <>
      <Suspense fallback={null}>
        <ProjectFilters statuses={statuses} />
      </Suspense>

      {projects.length > 0 ? (
        <ul className="projects-list-ul text-xl">
          {projects.map((project) => (
            <li className="py-3 underline" key={project.id}>
              <Link className="project-link" href={`projects/${project.id}`}>
                {project.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-6 text-xl">No projects found.</p>
      )}
    </>
  );
}
