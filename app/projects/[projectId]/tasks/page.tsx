import projects from "@/data/projects.json";
import BackButton from "../../BackButton";

export default async function ProjectDetailsTasks({
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
      <BackButton />
      <h1 className="text-xl font-bold pt-10 pb-6">Tasks</h1>
      {project.tasks.map((task) => (
        <p className="text-base py-2" key={task}>
          {task}
        </p>
      ))}
    </div>
  );
}
