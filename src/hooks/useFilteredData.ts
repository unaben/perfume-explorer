import { useMemo } from "react";
import type { AggregatedItem, DisplayItem, PerfumeGroup } from "../types";

/**
 * Custom hook to process, filter,
 * and aggregate the data based on types,
 * categories, and sizes.
 */
const useFilteredData = (
  rawData: Array<PerfumeGroup> | null,
  selectedTypes: Array<string>,
  selectedCategories: Array<string>,
  selectedSize: Array<string>
): Array<DisplayItem> => {
  return useMemo(() => {
    if (!rawData || rawData.length === 0) return [];

    const isTypeSelected = selectedTypes.length > 0;
    const isCategorySelected = selectedCategories.length > 0;
    const isSizeSelected = selectedSize.length > 0;

    const aggregatedObject = rawData
      .filter((group) => {
        const matchedSelectedType = isTypeSelected
          ? selectedTypes.includes(group.type)
          : true;

        const matchedSelectedCategory = isCategorySelected
          ? selectedCategories.includes(group.category)
          : true;

        return matchedSelectedType && matchedSelectedCategory;
      })
      .reduce((acc, group) => {
        group.variants.forEach((variant) => {
          if (isSizeSelected && !selectedSize.includes(variant.perfumeSize)) {
            return;
          }

          const key = `${variant.code}|${group.category}`;

          if (!acc[key]) {
            acc[key] = {
              olfactoryFamilies: new Set<string>(),
              category: group.category,
              code: variant.code,
              sizes: new Set<string>(),
            };
          }

          acc[key].olfactoryFamilies.add(group.type);
          acc[key].sizes.add(variant.perfumeSize);
        });

        return acc;
      }, {} as Record<string, AggregatedItem>);

    // Convert to final array format
    const finalData: Array<DisplayItem> = Object.values(aggregatedObject)
      .filter((item) => {
        // Ensure we only keep items that have at least one size after filtering
        return item.sizes.size > 0;
      })
      .map((item) => ({
        olfactoryFamilies: Array.from(item.olfactoryFamilies).sort(),
        category: item.category,
        code: item.code,
        sizes: Array.from(item.sizes).sort((a, b) => Number(a) - Number(b)),
      }));

    // Sort by code (handling the different formats)
    finalData.sort((a, b) => {
      const codeA = parseInt(a.code.replace(/\D/g, "")) || 0;
      const codeB = parseInt(b.code.replace(/\D/g, "")) || 0;
      return codeA - codeB;
    });

    return finalData;
  }, [rawData, selectedTypes, selectedCategories, selectedSize]);
};

export default useFilteredData;
