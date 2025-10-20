import { useMemo } from "react";
import { DisplayItem, AggregatedItem, PerfumeGroup } from "../types";

/**
 * Custom hook to process, filter, and aggregate the data based on both types and categories.
 */
const useFilteredData = (
    rawData: PerfumeGroup[], // <<< NOW ACCEPTS RAW DATA AS AN ARGUMENT
    selectedTypes: string[], 
    selectedCategories: string[]
  ): DisplayItem[] => {
    return useMemo(() => {
      if (rawData.length === 0) return [];
  
      const isTypeFilterActive = selectedTypes.length > 0;
      const isCategoryFilterActive = selectedCategories.length > 0;
  
     
      const aggregatedObject = rawData
        .filter(group => {
          const passesTypeFilter = isTypeFilterActive 
              ? selectedTypes.includes(group.type) 
              : true;
          
          const passesCategoryFilter = isCategoryFilterActive 
              ? selectedCategories.includes(group.category) 
              : true;
              
          return passesTypeFilter && passesCategoryFilter;
        })
        .reduce((acc, group) => {
          group.itemNo.forEach(code => {
            const key = `${code}|${group.category}`;
  
            if (!acc[key]) {
              acc[key] = {
                olfactoryFamilies: new Set<string>(),
                category: group.category,
                code: code,
              };
            }
            acc[key].olfactoryFamilies.add(group.type);
          });
          return acc;
        }, {} as Record<string, AggregatedItem>);
      const finalData: DisplayItem[] = Object.values(aggregatedObject).map(item => ({
          olfactoryFamilies: Array.from(item.olfactoryFamilies).sort(), 
          category: item.category,
          code: item.code,
      }));
      finalData.sort((a, b) => a.code - b.code);
  
      return finalData;
    }, [rawData, selectedTypes, selectedCategories]); 
  };
  

export default useFilteredData;
