
export interface PerfumeGroup {
  type: string; 
  category: string; 
  itemNo: number[]; 
}

export interface DisplayItem {
  olfactoryFamilies: string[]; 
  category: string;
  code: number;
}

export interface AggregatedItem {
  olfactoryFamilies: Set<string>; 
  category: string;
  code: number;
}
