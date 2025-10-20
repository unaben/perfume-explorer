import { useMemo } from "react";
import useFilteredData from "../../hooks/useFilteredData";
import FilterGroup from "../FilterGroup/FilterGroup";
import PerfumeTableGrid from "../PerfumeTableGrid/PerfumeTableGrid";
import useQueryStringState from "../../hooks/useQueryStringState";
import type { PerfumeGroup } from "../../types";
import useFetchApiData from "../../hooks/useFetchApiData";
import { getOptions } from "../../utils/getOptions";
import styles from "./MainDisplay.module.css";

const Display = () => {
  const { data: rawData } = useFetchApiData<PerfumeGroup>("/data.json");

  const [selectedTypes, setSelectedTypes] = useQueryStringState("type");
  const [selectedCategories, setSelectedCategories] =
    useQueryStringState("category");

  const allTypes = useMemo(() => getOptions(rawData, "type"), [rawData]);
  const allCategories = useMemo(
    () => getOptions(rawData, "category"),
    [rawData]
  );

  const filteredData = useFilteredData(
    rawData,
    selectedTypes,
    selectedCategories
  );

  return (
    <div className={styles["app-container"]}>
      <header className={styles["app-header"]}>
        <h1 className={styles["app-header-title"]}>
          Perfume Olfactory Explorer
        </h1>
        <p className={styles["app-header-subtitle"]}>
          Filter the catalog by Olfactory Family and Category. Filters are saved
          to the URL.
        </p>
      </header>

      <main className={styles["main-layout"]}>
        <div className={styles["filter-sidebar"]}>
          <div className={styles["filter-group-wrapper"]}>
            <FilterGroup
              title="Filter by Olfactory Family"
              allOptions={allTypes}
              selectedOptions={selectedTypes}
              setSelectedOptions={setSelectedTypes}
            />
            <FilterGroup
              title="Filter by Category"
              allOptions={allCategories}
              selectedOptions={selectedCategories}
              setSelectedOptions={setSelectedCategories}
            />
          </div>
        </div>
        
        <div className={styles["main-display-area"]}>
          <div className={styles["data-container"]}>
            <h2 className={styles["data-heading"]}>
              {filteredData.length} Matching Perfume Codes
            </h2>
            <PerfumeTableGrid data={filteredData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Display;
