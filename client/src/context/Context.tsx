import { createContext } from "react";

export const ShiftsContext = createContext<IShift[] | null>(null);

// export const ShiftContext = createContext<Partial<IShift>>({});
