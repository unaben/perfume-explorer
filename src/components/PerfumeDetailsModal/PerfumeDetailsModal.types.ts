import { DisplayItem } from "../../types";

export interface PerfumeDetailsModalProps {
    perfume: DisplayItem | null;
    onClose: () => void;
  }