interface PageProps {
  params: Promise<{
    projectDetails: string[];
  }>;
}

export default async function CatchAll({ params }: PageProps) {
  const requstedPage = await params;
  return (
    <h1 className="px-12 py-24">
      User has requested for the following page:{" "}
      <span className="text-xl">
        {" "}
        {requstedPage.projectDetails.map((param: string, index: number) => (
          <span key={index}>{`${param} `}</span>
        ))}
      </span>
    </h1>
  );
}
