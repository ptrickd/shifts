//if change ACTIONS has to be updated in global.d.ts
export enum VALUES_ACTIONS {
  SET_VALUES = "SET_VALUES",
}

interface IComputedValues {
  total: number;
}

const computeHoursInShift = (startTime: string, endTime: string) => {
  const startTimeHours = Number(startTime.substring(0, 2));
  const startTimeMinutes = Number(startTime.substring(3, 5));

  const endTimeHours = Number(endTime.substring(0, 2));
  const endTimeMinutes = Number(endTime.substring(3, 5));

  const totalHours = endTimeHours - startTimeHours;
  const totalMinutes = endTimeMinutes - startTimeMinutes;

  return totalHours + totalMinutes / 60;
};

const computeValuesByTotal = (shifts: IShift[]) => {
  //find the weekStart make it index 0

  // //map through shift
  const sortedValues = [
    { total: 0 },
    { total: 0 },
    { total: 0 },
    { total: 0 },
    { total: 0 },
    { total: 0 },
    { total: 0 },
  ];

  shifts.forEach((shift) => {
    const currentDate = new Date(`${shift.date} 07:00:00`);
    const weekStartDate = new Date(`${shift.weekStart} 07:00:00`);
    const currentIndex = currentDate.getDay() - weekStartDate.getDay();

    const total = computeHoursInShift(shift.startTime, shift.endTime);

    sortedValues[currentIndex] = {
      total: total + sortedValues[currentIndex].total,
    };
  });
  return sortedValues;
};

export function computedValuesReducer( //Record<string | never> type for empty object
  computedValues: IComputedValues[] | [],
  action: IValuesAction
): IComputedValues[] | [] {
  switch (action.type) {
    case VALUES_ACTIONS.SET_VALUES: {
      //   const shifts = action.payload;
      //   const weekStart = shifts[0].week_start;
      console.log(computedValues);
      if (
        action.payload &&
        Array.isArray(action.payload) &&
        action.payload.length
      ) {
        return computeValuesByTotal(action.payload);
      }

      return [];
      break;
    }
    default:
      return [];
  }
}
