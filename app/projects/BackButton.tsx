"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <button
      className="py-4 px-8 text-xl cursor-pointer hover:text-blue-500 border-2 rounded-lg "
      onClick={handleBack}
    >
      Back
    </button>
  );
}
