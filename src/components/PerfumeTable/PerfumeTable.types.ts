import { DisplayItem } from "../../types";

export interface PerfumeTableProps {
    data: DisplayItem[];
    onDetailsClick: (item: DisplayItem) => void;
  }