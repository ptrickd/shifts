//if change ACTIONS has to be updated in global.d.ts
export enum VALUES_ACTIONS {
  SET_VALUES = "SET_VALUES",
}
interface IComputedValues {
  1: { date: Date; total: number };
  2: { date: Date; total: number };
  3: { date: Date; total: number };
  4: { date: Date; total: number };
  5: { date: Date; total: number };
  6: { date: Date; total: number };
  7: { date: Date; total: number };
}
export function computedValuesReducer( //Record<string | never> type for empty object
  computedValues: IComputedValues | Record<string, never>,
  action: IValuesAction
): IComputedValues | Record<string, never> {
  switch (action.type) {
    case VALUES_ACTIONS.SET_VALUES: {
      //   const shifts = action.payload;
      //   const weekStart = shifts[0].week_start;
      console.log(computedValues);
      const newValues = {
        1: { date: new Date(), total: 1 },
        2: { date: new Date(), total: 1 },
        3: { date: new Date(), total: 1 },
        4: { date: new Date(), total: 1 },
        5: { date: new Date(), total: 1 },
        6: { date: new Date(), total: 1 },
        7: { date: new Date(), total: 1 },
      };

      //   for (const [key, value] of Object.entries(newValues)) {
      //     console.log(`${key}: ${value}`);

      //   }
      console.log("in the reudcer");
      return newValues;
      break;
    }
    default:
      return {};
  }
}
