"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface ProjectFiltersProps {
  statuses: string[];
}

export default function ProjectFilters({ statuses }: ProjectFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") ?? "";
  const currentStatus = searchParams.get("status") ?? "";

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/projects?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 py-4">
      <input
        type="text"
        placeholder="Search projects..."
        defaultValue={currentSearch}
        onChange={(e) => updateFilters("search", e.target.value)}
        className="border-2 rounded-lg px-4 py-2 text-base"
      />
      <select
        value={currentStatus}
        onChange={(e) => updateFilters("status", e.target.value)}
        className="border-2 rounded-lg px-4 py-2 text-base cursor-pointer"
      >
        <option value="">All Statuses</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
          </option>
        ))}
      </select>
    </div>
  );
}
