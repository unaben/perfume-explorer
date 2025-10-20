import { useCallback } from "react";
import cn from "classnames";
import { IFilterGroupProps } from "./FilterGroup.types";
import styles from "./FilterGroup.module.css";

const FilterGroup: React.FC<IFilterGroupProps> = (props) => {
  const { title, allOptions, selectedOptions, setSelectedOptions } = props;

  const handleCheckboxChange = useCallback(
    (option: string) => {
      let newSelected: string[];
      if (selectedOptions.includes(option)) {
        newSelected = selectedOptions.filter((t) => t !== option);
      } else {
        newSelected = [...selectedOptions, option];
      }
      setSelectedOptions(newSelected);
    },
    [selectedOptions, setSelectedOptions]
  );

  const handleClear = useCallback(() => {
    setSelectedOptions([]);
  }, [setSelectedOptions]);

  return (
    <div className={styles["filter-panel"]}>
      <h3 className={styles["filter-title"]}>{title}</h3>
      <div className={styles["filter-options-container"]}>
        {allOptions.map((option) => (
          <label
            key={option}
            className={cn(styles['filter-label'], {
              [styles['is-active']]: selectedOptions.includes(option),
            })}
          >
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className={styles["hidden-input"]}
            />
            {option}
          </label>
        ))}
      </div>
      <div className={styles["filter-controls"]}>
        <p className={styles["filter-status"]}>
          {selectedOptions.length === 0
            ? "Showing All"
            : `${selectedOptions.length} selected`}
        </p>
        <button
          onClick={handleClear}
          disabled={selectedOptions.length === 0}
          className={styles["clear-button"]}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterGroup;
