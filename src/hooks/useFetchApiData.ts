import { useEffect, useState } from "react";

type ApiData<T> = {
  data: Array<T>;
  isLoading: boolean;
  error: string;
};

function useFetchApiData<T>(url: string) {
  const [apiData, setApiData] = useState<ApiData<T>>({
    data: [],
    isLoading: false,
    error: "",
  });

  const fetchApiData = async (fetchUrl: string) => {
    setApiData((prev) => ({ ...prev, isLoading: true, error: "" }));

    try {
      const res = await fetch(fetchUrl);
      if (res.ok) {
        const resData: Array<T> = await res.json();
        setApiData((prev) => ({
          ...prev,
          data: resData,
          isLoading: false,
        }));
      } else {
        const errorText = `Failed to fetch: ${res.status} ${res.statusText}`;
        setApiData((prev) => ({ 
            ...prev, 
            error: errorText, 
            isLoading: false 
        }));
        console.error(errorText);
      }
    } catch (error) {
      if (error instanceof Error) {
        const apiError = error.message;
        setApiData((prev) => ({ ...prev, error: apiError, isLoading: false }));
        console.error(error);
      } else {
        setApiData((prev) => ({ 
            ...prev, 
            error: "An unknown error occurred", 
            isLoading: false 
        }));
      }
    }
  };
  useEffect(() => {
    fetchApiData(url);
  }, [url]);

  return apiData;
}

export default useFetchApiData;