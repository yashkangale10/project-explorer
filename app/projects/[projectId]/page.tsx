import projects from "@/data/projects.json";
import ProjectDetail from "./ProjectDetail";
import BackButton from "../BackButton";

interface PageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function ProjectDetails({ params }: PageProps) {
  const { projectId } = await params;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const projectDetails = projects.find(
    (project) => project.id === Number(projectId),
  );
  if (!projectDetails) {
    return <div className="px-12 py-12 text-xl">Project not found</div>;
  }
  return (
    <>
      <div className="px-12">
        <BackButton />
      </div>
      <ProjectDetail projectDetails={projectDetails} projectId={projectId} />
    </>
  );
}
