import { Suspense } from "react";
import ProjectsContent from "./ProjectsContent";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function ProjectsPage({ searchParams }: PageProps) {
  return (
    <div className="project-list px-12">
      <h1 className="text-2xl py-6 font-bold">Projects List</h1>
      <Suspense fallback={<p className="text-xl">Loading projects...</p>}>
        <ProjectsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
