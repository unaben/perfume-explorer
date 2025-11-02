import React from "react";
import cn from "classnames";
import { formatFamilies } from "../../utils/formatFamilies";
import type { PerfumeGridProps } from "./PerfumeGrid.types";
import styles from "./PerfumeGrid.module.css";

const PerfumeGrid: React.FC<PerfumeGridProps> = ({ data, onDetailsClick }) => {
  return (
    <div className={styles.perfumeGrid}>
      {data.map((item, index) => (
        <div key={index} className={styles.gridCard}>
          <div className={styles.cardHeader}>
            {formatFamilies(item.olfactoryFamilies)}
          </div>
          <div className={styles.cardBody}>
            <p>
              <strong>Category:</strong> {item.category}
            </p>
            <p>
              <strong>Code:</strong> <span className="">{item.code}</span>
            </p>
            <p>
              <strong>Size:</strong> {item.sizes} ml
            </p>
            <button
              onClick={() => onDetailsClick(item)}
              className={cn(styles.detailsButton, styles.detailsButtonFull)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerfumeGrid;
