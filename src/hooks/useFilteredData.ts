import { useMemo } from "react";
import type { AggregatedItem, DisplayItem, PerfumeGroup } from "../types";

/**
 * Custom hook to process, filter, and aggregate the data based on types, categories, and sizes.
 */
const useFilteredData = (
  rawData: Array<PerfumeGroup>,
  selectedTypes: Array<string>,
  selectedCategories: Array<string>,
  selectedSize: Array<string>
): Array<DisplayItem> => {
  return useMemo(() => {
    if (rawData.length === 0) return [];

    const isTypeFilterActive = selectedTypes.length > 0;
    const isCategoryFilterActive = selectedCategories.length > 0;
    const isSizeFilterActive = selectedSize.length > 0;

    // Aggregate data by code and category
    const aggregatedObject = rawData
      .filter((group) => {
        const passesTypeFilter = isTypeFilterActive
          ? selectedTypes.includes(group.type)
          : true;

        const passesCategoryFilter = isCategoryFilterActive
          ? selectedCategories.includes(group.category)
          : true;

        return passesTypeFilter && passesCategoryFilter;
      })
      .reduce((acc, group) => {
        group.variants.forEach((variant) => {
          // Apply size filter at the variant level
          if (
            isSizeFilterActive &&
            !selectedSize.includes(variant.perfumeSize)
          ) {
            return; // Skip this variant if it doesn't match selected sizes
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
