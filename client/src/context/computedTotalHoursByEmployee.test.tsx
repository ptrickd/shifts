import { expect, test } from "vitest";
import { computedTotalHoursByEmployee } from "./computedTotalHoursByEmployee";
import { VALUES_ACTIONS } from "../context/computedTotalHoursByDay";

const emptyMap = new Map();
const oneShift = [
  {
    id: 236,
    employeeId: 57,
    date: "2024-01-08",
    startTime: "07:15",
    endTime: "12:00",
    weekStart: "2024-01-07",
  },
];
const twoShiftsTwoEmployees = [
  {
    id: 236,
    employeeId: 57,
    date: "2024-01-08",
    startTime: "07:15",
    endTime: "12:00",
    weekStart: "2024-01-07",
  },
  {
    id: 237,
    employeeId: 67,
    date: "2024-01-07",
    startTime: "09:00",
    endTime: "12:00",
    weekStart: "2024-01-07",
  },
];
const threeShift2Employees = [
  {
    // total: 4.75
    id: 236,
    employeeId: 57,
    date: "2024-01-08",
    startTime: "07:15",
    endTime: "12:00",
    weekStart: "2024-01-07",
  },
  {
    // total: 6
    id: 238,
    employeeId: 57,
    date: "2024-01-07",
    startTime: "06:00",
    endTime: "12:00",
    weekStart: "2024-01-07",
  },
  {
    //total: 3
    id: 237,
    employeeId: 67,
    date: "2024-01-07",
    startTime: "09:00",
    endTime: "12:00",
    weekStart: "2024-01-07",
  },
];

test("action.type: setValues return empty array", () => {
  expect(
    computedTotalHoursByEmployee(emptyMap, {
      type: VALUES_ACTIONS.SET_VALUES,
      payload: [],
    })
  ).toStrictEqual(emptyMap);
});

test("action.type: setValues return hours for 1 employee", () => {
  const oneShiftExpected = new Map();
  oneShiftExpected.set(57, { totalHours: 4.75 });
  expect(
    computedTotalHoursByEmployee(emptyMap, {
      type: VALUES_ACTIONS.SET_VALUES,
      payload: oneShift,
    })
  ).toStrictEqual(oneShiftExpected);
});

test("action.type: setValues return hours for 2 shifts 2 employees", () => {
  const twoShiftsExpected = new Map();
  twoShiftsExpected.set(57, { totalHours: 4.75 });
  twoShiftsExpected.set(67, { totalHours: 3 });
  expect(
    computedTotalHoursByEmployee(emptyMap, {
      type: VALUES_ACTIONS.SET_VALUES,
      payload: twoShiftsTwoEmployees,
    })
  ).toStrictEqual(twoShiftsExpected);
});

test("action.type: setValues return hours for 3 shifts 2 employees", () => {
  const threeShiftsExpected = new Map();
  threeShiftsExpected.set(57, { totalHours: 10.75 });
  threeShiftsExpected.set(67, { totalHours: 3 });
  expect(
    computedTotalHoursByEmployee(emptyMap, {
      type: VALUES_ACTIONS.SET_VALUES,
      payload: threeShift2Employees,
    })
  ).toStrictEqual(threeShiftsExpected);
});
