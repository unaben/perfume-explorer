export type IFilterGroupProps = {
  title: string;
  allOptions: string[];
  selectedOptions: string[];
  setSelectedOptions: (newOptions: string[]) => void;
};
