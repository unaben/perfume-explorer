export interface Variant {
  code: string;
  perfumeSize: string;
}

export interface PerfumeGroup {
  type: string;
  category: string;
  variants: Array<Variant>;
}

export interface AggregatedItem {
  olfactoryFamilies: Set<string>;
  category: string;
  code: string;
  sizes: Set<string>;
}

export interface DisplayItem {
  olfactoryFamilies: Array<string>;
  category: string;
  code: string;
  sizes: Array<string>;
}
