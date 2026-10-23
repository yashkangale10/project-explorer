import Link from "next/link";

interface ProjectDetailProps {
  projectDetails: {
    id: number;
    name: string;
    status: string;
    overview: string;
    team: string[];
    tasks: string[];
  };
  projectId: string;
}

export default function ProjectDetail({
  projectDetails,
  projectId,
}: ProjectDetailProps) {
  return (
    <div className="project-details px-12">
      <h1 className="text-center text-2xl py-12">{projectDetails?.name}</h1>
      <div className="overview">
        <Link href={`/projects/${projectId}/overview`} className="text-2xl">
          Overview
        </Link>
        <p className="text-base">{projectDetails?.overview}</p>
      </div>
      <br />
      <div className="team">
        <Link href={`/projects/${projectId}/team`} className="text-2xl">
          Team
        </Link>
        {projectDetails?.team.map((member, index) => (
          <p key={index}>{member}</p>
        ))}
      </div>
      <br />
      <div className="tasks">
        <Link href={`/projects/${projectId}/tasks`} className="text-2xl">
          Tasks
        </Link>
        {projectDetails?.tasks.map((task, index) => (
          <p key={index}>{task}</p>
        ))}
      </div>
    </div>
  );
}
