import React from "react";
import styles from "./PerfumeDetailsModal.module.css";
import { PerfumeDetailsModalProps } from "./PerfumeDetailsModal.types";
import Details from "../Details/Details";

const PerfumeDetailsModal: React.FC<PerfumeDetailsModalProps> = ({
  perfume,
  onClose,
}) => {
  if (!perfume) return null;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Perfume Details</h3>
          <button onClick={onClose} className={styles.modalClose}>&times;</button>
        </div>
        <div className={styles.modalBody}>
        <Details perfumeCode={perfume.code} setToggleScreen={() => {}} />
          {/* <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Code:</span>
            <span className={`${styles.detailValue} ${styles.fontMono}`}>{perfume.code}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Size:</span>
            <span className={styles.detailValue}>{perfume.sizes}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Category:</span>
            <span className={styles.detailValue}>{perfume.category}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Olfactory Families:</span>
            <span className={styles.detailValue}>{formatFamilies(perfume.olfactoryFamilies)}</span>
          </div> */}
        </div> 
      </div>
    </div>
  );
};

export default PerfumeDetailsModal;
