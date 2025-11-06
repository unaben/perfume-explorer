import { PerfumeGroup } from "../types";

export const getOptions = (
  data: PerfumeGroup[] | null,
  key: "type" | "category" | "size"
): string[] => {
  if (!data || data.length === 0) return [];

  if (key === "size") {
    const sizes = data.flatMap(group =>
      group.variants.map(variant => variant.perfumeSize)
    );

    return Array.from(new Set(sizes)).sort(
      (a, b) => Number(a) - Number(b)
    );
  }

  const values = data.map(d => d[key]);
  return Array.from(new Set(values)).sort();
};