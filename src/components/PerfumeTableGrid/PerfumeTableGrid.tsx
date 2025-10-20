import cn from 'classnames'
import styles from './PerfumeTableGrid.module.css';
import { IPerfumeTableGridProps } from "./PerfumeTableGrid.types";

const PerfumeTableGrid: React.FC<IPerfumeTableGridProps> = ({ data }) => {  

  if (data.length === 0) {
    return (
      <div className="no-results">No perfumes match the selected criteria.</div>
    );
  }

  const formatFamilies = (families: string[]) => families.join(", ");

  return (
    <div className={styles["perfume-display-wrapper"]}>
      <table className={styles["data-table"]}>
        <thead>
          <tr className={styles["data-table-header"]}>
            <th>Olfactory Family</th>
            <th>Category</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={styles["data-table-row"]}>
              <td className={styles["data-table-cell"]}>
                {formatFamilies(item.olfactoryFamilies)}
              </td>
              <td className={styles["data-table-cell"]}>{item.category}</td>
              <td className={cn(styles["data-table-cell"], styles["data-code"])}>{item.code}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles["data-grid"]}>
        {data.map((item, index) => (
          <div key={index} className={styles["grid-card"]}>
            <div className={styles["card-header"]}>
              {formatFamilies(item.olfactoryFamilies)}
            </div>
            <div className={styles["card-body"]}>
              <p>
                <strong>Category:</strong> {item.category}
              </p>
              <p>
                <strong>Code:</strong>{" "}
                <span className={styles["data-code"]}>{item.code}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerfumeTableGrid;
