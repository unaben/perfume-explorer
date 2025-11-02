import cn from "classnames";
import type { IPerfumeTableGridProps } from "./PerfumeTableGrid.types";
import styles from "./PerfumeTableGrid.module.css";
import { formatFamilies } from "../../utils/formatFamilies";

const PerfumeTableGrid: React.FC<IPerfumeTableGridProps> = (props) => {
  const { data, setToggleScreen, setPerfumeCode } = props;

  if (data.length === 0) {
    return (
      <div className="no-results">No perfumes match the selected criteria.</div>
    );
  } 

  return (
    <div className={styles["perfume-display-wrapper"]}>
      <table className={styles["data-table"]}>
        <thead>
          <tr className={styles["data-table-header"]}>
            <th>Olfactory Family</th>
            <th>Category</th>
            <th>Size(ml)</th>
            <th>Code</th>
            <th>Perfume Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={styles["data-table-row"]}>
              <td className={styles["data-table-cell"]}>
                {formatFamilies(item.olfactoryFamilies)}
              </td>
              <td className={styles["data-table-cell"]}>{item.category}</td>
              <td className={styles["data-table-cell"]}>
                {formatFamilies(item.sizes)}
              </td>
              <td
                className={cn(styles["data-table-cell"], styles["data-code"])}
              >
                {item.code}
              </td>
              <td
                className={cn(styles["data-table-cell"], styles["data-code"])}
              >
                <button
                  className={styles.btn}
                  onClick={() => {
                    setPerfumeCode(item.code);
                    setToggleScreen("details");
                  }}
                >
                  Details
                </button>
              </td>
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
                <strong>Size:</strong>{" "}
                <span className={styles["data-code"]}>{item.sizes}ml</span>
              </p>
              <p>
                <strong>Code:</strong>{" "}
                <span className={styles["data-code"]}>{item.code}</span>
              </p>
              <div>
                <button
                  className={styles.btn}
                  onClick={() => {
                    setPerfumeCode(item.code);
                    setToggleScreen("details");
                  }}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerfumeTableGrid;
