export type IMultiSelectCheckboxProps = {
    id: string
    title: string;
    allOptions: string[];
    selectedOptions: string[];
    setSelectedOptions: (newOptions: string[]) => void;
  }
  