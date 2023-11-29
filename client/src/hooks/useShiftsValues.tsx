import { useState } from "react";

export function useShiftsValue(initialValue: IShift[] | []) {
  const [shifts, setShifts] = useState(initialValue);

  return [shifts, setShifts];
}
