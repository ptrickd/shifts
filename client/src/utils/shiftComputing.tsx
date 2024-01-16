import { createDate } from "./date";
export const computeHoursInShift = (startTime: string, endTime: string) => {
  const startTimeHours = Number(startTime.substring(0, 2));
  const startTimeMinutes = Number(startTime.substring(3, 5));

  const endTimeHours = Number(endTime.substring(0, 2));
  const endTimeMinutes = Number(endTime.substring(3, 5));

  const totalHours = endTimeHours - startTimeHours;
  const totalMinutes = endTimeMinutes - startTimeMinutes;

  return totalHours + totalMinutes / 60;
};

export const computeDayInShift = (date: string) => {
  const dateObject = createDate(date);
  return dateObject.getDay();
};
