import { PerfumeGroup } from "../types";

export const getOptions = (
  data: PerfumeGroup[],
  key: "type" | "category" | "size"
): string[] => {
  if (data.length === 0) return [];

  if (key === "size") {
    const allSizes = new Set<string>();

    data.forEach((group) => {
      group.variants.forEach((variant) => {
        allSizes.add(variant.perfumeSize);
      });
    });

    return Array.from(allSizes).sort((a, b) => Number(a) - Number(b));
  }

  return Array.from(new Set(data.map((d) => d[key]))).sort();
};
