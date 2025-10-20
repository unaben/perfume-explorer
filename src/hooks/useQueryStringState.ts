import { useCallback, useState } from "react";
import getInitialStateFromUrl from "../utils/getInitialStateFromUrl";

/**
 * A custom hook to manage a state (an array of strings) that is synchronized
 * with a URL query parameter for bookmarking.
 */
const useQueryStringState = (paramName: string): [string[], (newValues: string[]) => void] => {
  const [selectedValues, internalSetSelectedValues] = useState<string[]>(
    () => getInitialStateFromUrl(paramName)
  );
  const setSelectedValues = useCallback((newValues: string[]) => {
    if (JSON.stringify(newValues) === JSON.stringify(selectedValues)) {
        return;
    }

    internalSetSelectedValues(newValues);

    const params = new URLSearchParams(window.location.search);
    if (newValues.length > 0) {
      const encodedValue = newValues.map(encodeURIComponent).join(',');
      params.set(paramName, encodedValue);
    } else {
      params.delete(paramName);
    }
    
    window.history.replaceState(null, '', `?${params.toString()}`);

  }, [paramName, selectedValues]);

  return [selectedValues, setSelectedValues];
};
export default useQueryStringState