import { useEffect, useState } from "react";

function useQueryParam(
  key: string
): [string | null, (newValue: string) => void] {
  const [value, setValue] = useState(
    new URLSearchParams(window.location.search).get(key)
  );

  useEffect(() => {
    const handlePopState = () => {
      setValue(new URLSearchParams(window.location.search).get(key));
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [key]);

  const updateQueryParam = (newValue: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, newValue);
    window.history.pushState(null, "", `?${searchParams.toString()}`);
    setValue(newValue);
  };

  return [value, updateQueryParam];
}

export default useQueryParam;
