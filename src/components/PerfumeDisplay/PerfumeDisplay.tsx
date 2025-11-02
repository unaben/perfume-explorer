
import React, { useState } from 'react';
import styles from './PerfumeDisplay.module.css';
import { DisplayItem } from '../../types';
import PerfumeTable from '../PerfumeTable/PerfumeTable';
import PerfumeGrid from '../PerfumeGrid/PerfumeGrid';
import PerfumeDetailsModal from '../PerfumeDetailsModal/PerfumeDetailsModal';

const PerfumeDisplay: React.FC<{ data: DisplayItem[] }> = ({ data }) => {
  const [selectedPerfume, setSelectedPerfume] = useState<DisplayItem | null>(null);

  if (data.length === 0) {
    return <div className={styles.emptyState}>No perfumes match the selected criteria.</div>;
  }

  return (
    <>
      <div className={styles.displayWrapper}>
        <PerfumeTable data={data} onDetailsClick={setSelectedPerfume} />
        <PerfumeGrid data={data} onDetailsClick={setSelectedPerfume} />
      </div>
      <PerfumeDetailsModal perfume={selectedPerfume} onClose={() => setSelectedPerfume(null)} />
    </>
  );
};

export default PerfumeDisplay;
