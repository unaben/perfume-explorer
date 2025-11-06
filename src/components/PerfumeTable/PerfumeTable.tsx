import React from 'react';
import styles from './PerfumeTable.module.css';
import { formatFamilies } from '../../utils/formatFamilies';
import { PerfumeTableProps } from './PerfumeTable.types';

const PerfumeTable: React.FC<PerfumeTableProps> = ({ data, onDetailsClick }) => {
  return (
    <table className={styles.perfumeTable}>
      <thead>
        <tr>
          <th>Olfactory Family</th>
          <th>Category</th>
          <th>Code</th>
          <th>Size(ML)</th>
          <th>Perfume Details</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr  key={index}>
            <td data-label="Olfactory Family">{formatFamilies(item.olfactoryFamilies)}</td>
            <td data-label="Category">{item.category}</td>
            <td data-label="Code">{item.code}</td>
            <td  data-label="Size">{item.sizes}</td>
            <td data-label="Details">
              <button onClick={() => onDetailsClick(item)} className={styles.detailsButton}>
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PerfumeTable;
