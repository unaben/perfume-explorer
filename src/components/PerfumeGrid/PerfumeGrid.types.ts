import { DisplayItem } from "../../types";

export interface PerfumeGridProps {
    data: DisplayItem[];
    onDetailsClick: (item: DisplayItem) => void;
  }