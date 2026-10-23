import projects from "@/data/projects.json";
import BackButton from "../../BackButton";

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
      <BackButton />
      <h1 className="text-xl font-bold pt-10 pb-4">Team</h1>
      <p className="text-base pb-4">
        The following members worked on this project:{" "}
      </p>
      {project.team.map((member) => (
        <p className="text-base py-2" key={member}>
          {member}
        </p>
      ))}
    </div>
  );
}
