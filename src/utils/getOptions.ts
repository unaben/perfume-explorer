import { PerfumeGroup } from "../types";

export const getOptions = (
    data: PerfumeGroup[],
    key: "type" | "category"
  ): string[] => {
    if (data.length === 0) return [];
    return Array.from(new Set(data.map((d) => d[key]))).sort();
  };