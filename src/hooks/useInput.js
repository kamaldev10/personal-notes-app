import { useState } from "react";

// Reusable controlled input hook
export function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => setValue(typeof e === "string" ? e : e.target.value);
  const reset = () => setValue(initialValue);
  return [value, onChange, reset];
}
