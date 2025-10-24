import { useCallback } from "react";
import cn from "classnames";
import type { IMultiSelectCheckboxProps } from "./MultiSelectCheckbox.types";
import styles from "./MultiSelectCheckbox.module.css";


const MultiSelectCheckbox = (props: IMultiSelectCheckboxProps) => {
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
      {title && <h3 className={styles["filter-title"]}>{title}</h3>}
      <div className={styles["filter-options-container"]}>
        {allOptions?.map((option) => {
          return (
            <label key={option} className={styles.radio}>
              <input
                className={styles.input}
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              <span role="presentation" className={styles.box}></span>
              {option && (
                <p
                  className={cn(styles.label, {
                    [styles.active]: selectedOptions.includes(option),
                  })}
                >
                  {" "}
                  {option}
                </p>
              )}
            </label>
          );
        })}
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
export default MultiSelectCheckbox;
