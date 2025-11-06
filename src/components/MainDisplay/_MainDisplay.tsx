import { useMemo, useState } from "react";
import useFetchApiData from "../../hooks/useFetchApiData";
import useFilteredData from "../../hooks/useFilteredData";
import useQueryStringState from "../../hooks/useQueryStringState";
import type { PerfumeGroup } from "../../types";
import { getOptions } from "../../utils/getOptions";
import MultiSelectCheckbox from "../MultiSelectCheckbox/MultiSelectCheckbox";
import PerfumeTableGrid from "../PerfumeTableGrid/PerfumeTableGrid";
import Details from "../Details/Details";
import styles from "./_MainDisplay.module.css";

const Display = () => {
  const { data: rawData } = useFetchApiData<Array<PerfumeGroup>>("/data.json");
  const [toggleScreen, setToggleScreen] = useState<"display" | "details">(
    "display"
  );
  const [perfumeCode, setPerfumeCode] = useState<string>(""); 
  const [selectedTypes, setSelectedTypes] = useQueryStringState("type");
  const [selectedCategories, setSelectedCategories] =
    useQueryStringState("category");
  const [selectedSizes, setSelectedSizes] = useQueryStringState("size");

  const allTypes = useMemo(() => getOptions(rawData, "type"), [rawData]);
  const allCategories = useMemo(
    () => getOptions(rawData, "category"),
    [rawData]
  );
  const allSizes = useMemo(() => getOptions(rawData, "size"), [rawData]);

  const filteredData = useFilteredData(
    rawData,
    selectedTypes,
    selectedCategories,
    selectedSizes
  );

  return (
    <div className={styles["app-container"]}>
      <header className={styles["app-header"]}>
        <h1 className={styles["app-header-title"]}>
          Perfume Olfactory Explorer
        </h1>
        {toggleScreen === "display" && (
          <p className={styles["app-header-subtitle"]}>
            Filter the catalog by Olfactory Family and Category. Filters are
            saved to the URL.
          </p>
        )}
      </header>

      {toggleScreen === "display" && (
        <main className={styles["main-layout"]}>
          <div className={styles["filter-sidebar"]}>
            <div className={styles["filter-group-wrapper"]}>
              <MultiSelectCheckbox
                id="Olfactory Family"
                title="Filter by Olfactory Family Type"
                allOptions={allTypes}
                selectedOptions={selectedTypes}
                setSelectedOptions={setSelectedTypes}
              />
              <MultiSelectCheckbox
                id="Category"
                title="Filter by Category"
                allOptions={allCategories}
                selectedOptions={selectedCategories}
                setSelectedOptions={setSelectedCategories}
              />
              <MultiSelectCheckbox
                id="Size"
                title="Filter by Size"
                allOptions={allSizes}
                selectedOptions={selectedSizes}
                setSelectedOptions={setSelectedSizes}
              />
            </div>
          </div>
          <div className={styles["main-display-area"]}>
            <div className={styles["data-container"]}>
              <h2 className={styles["data-heading"]}>
                {filteredData.length} Matching Perfume Codes
              </h2>
              <PerfumeTableGrid
                data={filteredData}
                setToggleScreen={setToggleScreen}
                setPerfumeCode={setPerfumeCode}
              />
            </div>
          </div>
        </main>
      )}
      {toggleScreen === "details" && (
        <Details setToggleScreen={setToggleScreen} perfumeCode={perfumeCode} />
      )}
    </div>
  );
};

export default Display;