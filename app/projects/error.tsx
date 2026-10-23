"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="px-12 py-12">
      <h2 className="text-2xl font-bold py-4">Something went wrong!</h2>
      <p className="text-xl py-2">Failed to load projects. Please try again.</p>
      <button
        onClick={reset}
        className="border-2 rounded-lg px-6 py-2 text-base cursor-pointer mt-4"
      >
        Retry
      </button>
    </div>
  );
}
