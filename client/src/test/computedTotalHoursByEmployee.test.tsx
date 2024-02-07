import { describe, expect, test } from "vitest";
import { computedTotalHoursByEmployee } from "../reducer/computedTotalHoursByEmployee";
import { VALUES_ACTIONS } from "../reducer/computedTotalHoursByDay";

const emptyMap = new Map();

describe("totalHoursByEmployee: action.type.setValues", () => {
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
      date: "2024-01-07",
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
  test("it return empty array", () => {
    expect(
      computedTotalHoursByEmployee(emptyMap, {
        type: VALUES_ACTIONS.SET_VALUES,
        payload: [],
      })
    ).toStrictEqual(emptyMap);
  });

  test("it return hours for 1 employee", () => {
    const oneShiftExpected = new Map();
    oneShiftExpected.set(57, {
      hoursByDay: [0, 4.75, 0, 0, 0, 0, 0],
      totalHours: 4.75,
    });
    expect(
      computedTotalHoursByEmployee(emptyMap, {
        type: VALUES_ACTIONS.SET_VALUES,
        payload: oneShift,
      })
    ).toStrictEqual(oneShiftExpected);
  });

  test("it return hours for 2 shifts 2 employees", () => {
    const twoShiftsExpected = new Map();
    twoShiftsExpected.set(57, {
      hoursByDay: [4.75, 0, 0, 0, 0, 0, 0],
      totalHours: 4.75,
    });
    twoShiftsExpected.set(67, {
      hoursByDay: [3, 0, 0, 0, 0, 0, 0],
      totalHours: 3,
    });
    expect(
      computedTotalHoursByEmployee(emptyMap, {
        type: VALUES_ACTIONS.SET_VALUES,
        payload: twoShiftsTwoEmployees,
      })
    ).toStrictEqual(twoShiftsExpected);
  });

  test("it return hours for 3 shifts 2 employees", () => {
    const threeShiftsExpected = new Map();
    threeShiftsExpected.set(57, {
      hoursByDay: [6, 4.75, 0, 0, 0, 0, 0],
      totalHours: 10.75,
    });
    threeShiftsExpected.set(67, {
      hoursByDay: [3, 0, 0, 0, 0, 0, 0],
      totalHours: 3,
    });
    expect(
      computedTotalHoursByEmployee(emptyMap, {
        type: VALUES_ACTIONS.SET_VALUES,
        payload: threeShift2Employees,
      })
    ).toStrictEqual(threeShiftsExpected);
  });
});

describe("totalHoursByEmployee: action.type.addValues", () => {
  const newShift = {
    id: 236,
    employeeId: 57,
    date: "2024-01-10",
    startTime: "08:00",
    endTime: "12:00",
    weekStart: "2024-01-07",
  };
  test("it add 4 hours to first employee", () => {
    const expectedResponse = new Map();
    expectedResponse.set(57, {
      hoursByDay: [0, 0, 0, 4, 0, 0, 0],
      totalHours: 4,
    });
    expect(
      computedTotalHoursByEmployee(emptyMap, {
        type: VALUES_ACTIONS.ADD_VALUES,
        payload: newShift,
      })
    ).toStrictEqual(expectedResponse);
  });
  // test("it add 4 hours to a second employee", () => {
  //   const initialValue = new Map();
  //   initialValue.set(67, { dates: ["2024-01-10"], totalHours: 4 });
  //   const expectedResponse = new Map();
  //   expectedResponse.set(57, { dates: ["2024-01-10"], totalHours: 4 });
  //   expectedResponse.set(67, { dates: ["2024-01-10"], totalHours: 4 });
  //   expect(
  //     computedTotalHoursByEmployee(initialValue, {
  //       type: VALUES_ACTIONS.ADD_VALUES,
  //       payload: newShift,
  //     })
  //   ).toStrictEqual(expectedResponse);
  // });
  // test("it add 4 hours to a the first employee, 2 employee total", () => {
  //   const initialValue = new Map();
  //   initialValue.set(67, { dates: ["2024-01-09"], totalHours: 4 });
  //   initialValue.set(57, { dates: ["2024-01-10"], totalHours: 4 });
  //   const expectedResponse = new Map();
  //   expectedResponse.set(57, {
  //     dates: ["2024-01-09", "2024-01-10"],
  //     totalHours: 8,
  //   });
  //   expectedResponse.set(67, { dates: ["2024-01-10"], totalHours: 4 });
  //   expect(
  //     computedTotalHoursByEmployee(initialValue, {
  //       type: VALUES_ACTIONS.ADD_VALUES,
  //       payload: newShift,
  //     })
  //   ).toStrictEqual(expectedResponse);
  // });
  //   test("it add 1 hours to 1 employee, same shift", () => {
  //     const modifiedShift = {
  //       id: 236,
  //       employeeId: 57,
  //       date: "2024-01-09",
  //       startTime: "08:00",
  //       endTime: "13:00",
  //       weekStart: "2024-01-07",
  //     };
  //     const initialValue = new Map();
  //     initialValue.set(67, { date: ["2024-01-09"], totalHours: 4 });
  //     const expectedResponse = new Map();
  //     expectedResponse.set(67, {
  //       date: ["2024-01-09"],
  //       totalHours: 5,
  //     });
  //     expect(
  //       computedTotalHoursByEmployee(initialValue, {
  //         type: VALUES_ACTIONS.ADD_VALUES,
  //         payload: modifiedShift,
  //       })
  //     ).toStrictEqual(expectedResponse);
  //   });
});
