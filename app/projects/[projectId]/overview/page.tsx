import projects from "@/data/projects.json";

export default async function ProjectDetailsOverview({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const projectId = await params;
  const project = projects.find(
    (project) => project.id == Number(projectId.projectId),
  );
  if (!project) {
    return <div>Project not found</div>;
  }
  return (
    <div className="px-12">
      <h1 className="text-xl font-bold">Overview</h1>
      <p className="text-base">{project.overview}</p>
    </div>
  );
}
