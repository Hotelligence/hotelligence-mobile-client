import { useState, useEffect } from "react";

const useDebounce = (value, delay = 250) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeOut);
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
