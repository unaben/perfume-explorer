import { useMemo } from "react";
import useFetchApiData from "../../hooks/useFetchApiData";
import useFilteredData from "../../hooks/useFilteredData";
import useQueryStringState from "../../hooks/useQueryStringState";
import { PerfumeGroup } from "../../types";
import { getOptions } from "../../utils/getOptions";
import Header from "../Header/Header";
import MultiSelectCheckbox from "../MultiSelectCheckbox/MultiSelectCheckbox";
import PerfumeDisplay from "../PerfumeDisplay/PerfumeDisplay";
import styles from "./MainDisplay.module.css";

const MainDisplay = () => {
  const { data: rawData } = useFetchApiData<PerfumeGroup>("/data.json");
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
    <div className={styles.appContainer}>
      <Header />
      <main className={styles.mainLayout}>
        <aside className={styles.filterSidebar}>
          <div className={styles.filterSidebarInner}>
            <MultiSelectCheckbox
              id="Olfactory Family"
              title="Filter by Olfactory Family"
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
        </aside>
        <section className={styles.mainDisplayArea}>
          <div className={styles.tableCard}>
            <div className={styles.stickyHeader}>
              <h2 className={styles.tableHeaderTitle}>
                {filteredData.length} Matching Perfume Codes
              </h2>
            </div>
            <div className={styles.tableContainer}>
              <PerfumeDisplay data={filteredData} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainDisplay;
