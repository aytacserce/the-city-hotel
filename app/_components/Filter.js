"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "all" ? "bg-primary-700 text-primary-50" : ""
        }`}
        onClick={() => handleFilter("all")}
      >
        All rooms
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "small" ? "bg-primary-700 text-primary-50" : ""
        }`}
        onClick={() => handleFilter("small")}
      >
        1&mdash;2 guests
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "large" ? "bg-primary-700 text-primary-50" : ""
        }`}
        onClick={() => handleFilter("large")}
      >
        3&mdash;4 guests
      </button>
    </div>
  );
}
