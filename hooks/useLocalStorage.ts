import { useState, useEffect } from "react";

// Define a generic type for the value stored in local storage
type LocalStorageValue<T> = T | Record<string, any>;

// Define the hook with a generic type parameter for the expected value type
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Check if localStorage is available (i.e., not in a server-side rendering environment)
  const localStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  // Get the initial value from local storage or use the provided initial value
  const storedValue: LocalStorageValue<T> = localStorageAvailable
    ? JSON.parse(localStorage.getItem(key) || '{"none":"none"}')
    : initialValue;

  // Create state to hold the current value
  const [value, setValue] = useState<LocalStorageValue<T>>(storedValue);

  // Update local storage whenever the value changes
  useEffect(() => {
    if (localStorageAvailable) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, localStorageAvailable]);

  // Return the value and a function to update it
  return [value, setValue] as const;
}
