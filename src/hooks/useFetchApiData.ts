import { useEffect, useState } from "react";

type ApiData<T> = {
  data: T | null;
  isLoading: boolean;
  error: string;
};

function useFetchApiData<T>(url: string) {
  const [apiData, setApiData] = useState<ApiData<T>>({
    data: null,
    isLoading: false,
    error: "",
  });

  const fetchApiData = async (fetchUrl: string) => {
    setApiData((prev) => ({ ...prev, isLoading: true, error: "" }));

    try {
      const res = await fetch(fetchUrl);
      if (!res.ok) {
        const errorText = `Failed to fetch: ${res.status} ${res.statusText}`;
        throw new Error(errorText);
      }

      const resData: T = await res.json();
      setApiData({
        data: resData,
        isLoading: false,
        error: "",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      setApiData({
        data: null,
        isLoading: false,
        error: message,
      });
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApiData(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return apiData;
}

export default useFetchApiData;
